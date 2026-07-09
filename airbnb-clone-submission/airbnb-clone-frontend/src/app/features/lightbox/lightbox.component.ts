import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { GalleryStateService } from '../../core/services/gallery-state.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss',
})
export class LightboxComponent implements OnInit, OnDestroy {
  protected readonly gallery = inject(GalleryStateService);

  @ViewChild('closeButton') closeButtonRef?: ElementRef<HTMLButtonElement>;

  private lastFocusedElement: HTMLElement | null = null;

  ngOnInit(): void {
    this.lastFocusedElement = document.activeElement as HTMLElement | null;
    queueMicrotask(() => this.closeButtonRef?.nativeElement.focus());
  }

  ngOnDestroy(): void {
    this.lastFocusedElement?.focus?.();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft(): void {
    this.gallery.prev();
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight(): void {
    this.gallery.next();
  }

  close(): void {
    this.gallery.closeLightbox();
  }

  prev(): void {
    this.gallery.prev();
  }

  next(): void {
    this.gallery.next();
  }
}
