import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  inject,
} from '@angular/core';
import { GalleryStateService } from '../../core/services/gallery-state.service';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { Photo } from '../../core/models/listing.model';

interface RoomGroup {
  room: string;
  caption: string;
  photos: (Photo & { globalIndex: number })[];
}

@Component({
  selector: 'app-photo-tour',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './photo-tour.component.html',
  styleUrl: './photo-tour.component.scss',
})
export class PhotoTourComponent implements OnInit, OnDestroy {
  protected readonly gallery = inject(GalleryStateService);

  @ViewChild('closeButton') closeButtonRef?: ElementRef<HTMLButtonElement>;
  @ViewChild('scrollRoot') scrollRootRef?: ElementRef<HTMLDivElement>;

  private lastFocusedElement: HTMLElement | null = null;

  /** Photos grouped by room, preserving overall order — one heading per room, multiple photos underneath. */
  protected readonly roomGroups = computed<RoomGroup[]>(() => {
    const groups: RoomGroup[] = [];
    this.gallery.photos().forEach((photo, index) => {
      const last = groups[groups.length - 1];
      if (last && last.room === photo.room) {
        last.photos.push({ ...photo, globalIndex: index });
      } else {
        groups.push({ room: photo.room, caption: photo.caption, photos: [{ ...photo, globalIndex: index }] });
      }
    });
    return groups;
  });

  /** One representative thumbnail per unique room, for the sticky nav strip. */
  protected readonly roomThumbnails = computed(() => this.roomGroups().map((g) => g.photos[0]));

  ngOnInit(): void {
    this.lastFocusedElement = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    // Focus the close button once the overlay has rendered.
    queueMicrotask(() => this.closeButtonRef?.nativeElement.focus());
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    this.lastFocusedElement?.focus?.();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.gallery.isLightboxOpen()) {
      this.close();
    }
  }

  close(): void {
    this.gallery.closePhotoTour();
  }

  openPhotoInLightbox(index: number): void {
    this.gallery.openLightbox(index);
  }

  scrollToRoom(photoId: string): void {
    const el = this.scrollRootRef?.nativeElement.querySelector<HTMLElement>(`[data-photo-id="${photoId}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
