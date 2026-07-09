import { Injectable, signal, computed } from '@angular/core';
import { Photo } from '../models/listing.model';

/**
 * Coordinates the two overlay views (Photo Tour + Lightbox) that sit on top
 * of the Listing Page. Kept as a small signal-based store rather than plain
 * component state so either overlay can be opened from anywhere (hero grid,
 * "Show all photos" button, or a thumbnail inside the Photo Tour itself).
 */
@Injectable({ providedIn: 'root' })
export class GalleryStateService {
  private readonly _photos = signal<Photo[]>([]);
  private readonly _isPhotoTourOpen = signal(false);
  private readonly _isLightboxOpen = signal(false);
  private readonly _activeIndex = signal(0);

  readonly photos = this._photos.asReadonly();
  readonly isPhotoTourOpen = this._isPhotoTourOpen.asReadonly();
  readonly isLightboxOpen = this._isLightboxOpen.asReadonly();
  readonly activeIndex = this._activeIndex.asReadonly();

  readonly activePhoto = computed(() => this._photos()[this._activeIndex()] ?? null);
  readonly totalPhotos = computed(() => this._photos().length);

  setPhotos(photos: Photo[]): void {
    this._photos.set(photos);
  }

  openPhotoTour(): void {
    this._isPhotoTourOpen.set(true);
  }

  closePhotoTour(): void {
    this._isPhotoTourOpen.set(false);
  }

  openLightbox(index: number): void {
    this._activeIndex.set(this.clampIndex(index));
    this._isLightboxOpen.set(true);
  }

  closeLightbox(): void {
    this._isLightboxOpen.set(false);
  }

  next(): void {
    this._activeIndex.update((i) => this.clampIndex(i + 1));
  }

  prev(): void {
    this._activeIndex.update((i) => this.clampIndex(i - 1));
  }

  private clampIndex(index: number): number {
    const total = this._photos().length;
    if (total === 0) return 0;
    return (index + total) % total;
  }
}
