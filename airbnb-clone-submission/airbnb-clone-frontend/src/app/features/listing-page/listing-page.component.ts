import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { Listing } from '../../core/models/listing.model';
import { GalleryStateService } from '../../core/services/gallery-state.service';
import { ListingService } from '../../core/services/listing.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PhotoTourComponent } from '../photo-tour/photo-tour.component';
import { LightboxComponent } from '../lightbox/lightbox.component';
import { AmenitiesModalComponent } from '../amenities-modal/amenities-modal.component';
import { BookingCalendarComponent } from '../booking-calendar/booking-calendar.component';

type NavTab = 'photos' | 'amenities' | 'reviews' | 'location';

@Component({
  selector: 'app-listing-page',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    PhotoTourComponent,
    LightboxComponent,
    AmenitiesModalComponent,
    BookingCalendarComponent,
  ],
  templateUrl: './listing-page.component.html',
  styleUrl: './listing-page.component.scss',
})
export class ListingPageComponent implements OnInit {
  private readonly listingService = inject(ListingService);
  protected readonly gallery = inject(GalleryStateService);

  protected readonly listing = signal<Listing | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly isSaved = signal(false);
  protected readonly isDescriptionExpanded = signal(false);
  protected readonly isNeighbourhoodExpanded = signal(false);
  protected readonly isAmenitiesModalOpen = signal(false);
  protected readonly expandedReviewIds = signal<Set<string>>(new Set());

  protected readonly isStickyNavVisible = signal(false);
  protected readonly activeTab = signal<NavTab>('photos');
  protected readonly isReserveTooltipVisible = signal(false);

  protected readonly checkInDate = signal<Date | null>(null);
  protected readonly checkOutDate = signal<Date | null>(null);
  protected readonly guestCount = signal(2);

  @ViewChild('photosSection') photosSectionRef?: ElementRef<HTMLElement>;
  @ViewChild('amenitiesSection') amenitiesSectionRef?: ElementRef<HTMLElement>;
  @ViewChild('reviewsSection') reviewsSectionRef?: ElementRef<HTMLElement>;
  @ViewChild('locationSection') locationSectionRef?: ElementRef<HTMLElement>;
  @ViewChild('nearbyScroll') nearbyScrollRef?: ElementRef<HTMLElement>;

  /** First photo per unique room, in order — the 5-photo bento grid at the top of the page. */
  protected readonly heroPhotos = computed(() => (this.listing()?.photos ?? []).filter((p) => p.hero));

  protected readonly previewAmenities = computed(() => (this.listing()?.amenityItems ?? []).slice(0, 6));

  protected readonly nights = computed(() => {
    const inD = this.checkInDate();
    const outD = this.checkOutDate();
    if (!inD || !outD) return this.listing()?.nights ?? 0;
    return Math.round((outD.getTime() - inD.getTime()) / (1000 * 60 * 60 * 24));
  });

  protected readonly formattedTotalPrice = computed(() => {
    const l = this.listing();
    if (!l) return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: l.currency,
      maximumFractionDigits: 0,
    }).format(l.totalPrice);
  });

  protected formatPrice(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  ngOnInit(): void {
    this.listingService.getListing(environment.listingId).subscribe({
      next: (listing) => {
        this.listing.set(listing);
        this.gallery.setPhotos(listing.photos);
        this.guestCount.set(listing.defaultGuestSelection);
        this.checkInDate.set(this.parseDate(listing.checkInDate));
        this.checkOutDate.set(this.parseDate(listing.checkOutDate));
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load this listing. Is the backend running on localhost:8080?');
        this.loading.set(false);
      },
    });
  }

  private parseDate(mmddyyyy: string): Date | null {
    if (!mmddyyyy) return null;
    const [month, day, year] = mmddyyyy.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const heroBottom = this.photosSectionRef?.nativeElement.getBoundingClientRect().bottom ?? 0;
    this.isStickyNavVisible.set(heroBottom < 0);
  }

  protected toggleSaved(): void {
    this.isSaved.update((v) => !v);
  }

  protected toggleDescription(): void {
    this.isDescriptionExpanded.update((v) => !v);
  }

  protected toggleNeighbourhood(): void {
    this.isNeighbourhoodExpanded.update((v) => !v);
  }

  protected toggleReviewExpanded(id: string): void {
    this.expandedReviewIds.update((set) => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  protected isReviewExpanded(id: string): boolean {
    return this.expandedReviewIds().has(id);
  }

  protected openPhotoTour(): void {
    this.gallery.openPhotoTour();
  }

  protected openAmenitiesModal(): void {
    this.isAmenitiesModalOpen.set(true);
  }

  protected closeAmenitiesModal(): void {
    this.isAmenitiesModalOpen.set(false);
  }

  protected onRangeChange(range: { checkIn: Date | null; checkOut: Date | null }): void {
    this.checkInDate.set(range.checkIn);
    this.checkOutDate.set(range.checkOut);
  }

  protected selectTab(tab: NavTab): void {
    this.activeTab.set(tab);
    const targetRef = {
      photos: this.photosSectionRef,
      amenities: this.amenitiesSectionRef,
      reviews: this.reviewsSectionRef,
      location: this.locationSectionRef,
    }[tab];
    targetRef?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected onReserveClick(): void {
    this.isReserveTooltipVisible.set(true);
    setTimeout(() => this.isReserveTooltipVisible.set(false), 2200);
  }

  protected scrollNearby(direction: 1 | -1): void {
    const el = this.nearbyScrollRef?.nativeElement;
    el?.scrollBy({ left: direction * 340, behavior: 'smooth' });
  }

  protected guestSummary(l: Listing): string {
    return `${l.guests} guest${l.guests !== 1 ? 's' : ''} \u00b7 ${l.bedrooms} bedroom${
      l.bedrooms !== 1 ? 's' : ''
    } \u00b7 ${l.beds} bed${l.beds !== 1 ? 's' : ''} \u00b7 ${l.bathrooms} bathroom${l.bathrooms !== 1 ? 's' : ''}`;
  }

  protected starBarWidth(percent: number): string {
    return `${percent}%`;
  }
}
