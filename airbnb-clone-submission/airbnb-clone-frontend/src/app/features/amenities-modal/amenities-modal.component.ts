import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { AmenityItem } from '../../core/models/listing.model';
import { IconComponent } from '../../shared/components/icon/icon.component';

interface AmenityCategoryGroup {
  category: string;
  items: AmenityItem[];
}

@Component({
  selector: 'app-amenities-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './amenities-modal.component.html',
  styleUrl: './amenities-modal.component.scss',
})
export class AmenitiesModalComponent implements OnInit, OnDestroy {
  private readonly _amenities = signal<AmenityItem[]>([]);
  @Input() set amenities(value: AmenityItem[]) {
    this._amenities.set(value ?? []);
  }

  @Output() close = new EventEmitter<void>();

  @ViewChild('closeButton') closeButtonRef?: ElementRef<HTMLButtonElement>;

  private lastFocusedElement: HTMLElement | null = null;

  protected readonly groups = computed<AmenityCategoryGroup[]>(() => {
    const byCategory = new Map<string, AmenityItem[]>();
    for (const item of this._amenities()) {
      const list = byCategory.get(item.category) ?? [];
      list.push(item);
      byCategory.set(item.category, list);
    }
    return Array.from(byCategory.entries()).map(([category, items]) => ({ category, items }));
  });

  ngOnInit(): void {
    this.lastFocusedElement = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    queueMicrotask(() => this.closeButtonRef?.nativeElement.focus());
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    this.lastFocusedElement?.focus?.();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close.emit();
  }

  protected onClose(): void {
    this.close.emit();
  }
}
