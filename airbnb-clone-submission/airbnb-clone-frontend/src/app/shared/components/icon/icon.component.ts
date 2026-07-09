import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';

export type IconName =
  | 'share'
  | 'heart'
  | 'heart-filled'
  | 'star'
  | 'grid'
  | 'close'
  | 'chevron-left'
  | 'chevron-right'
  | 'arrow-left';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <ng-container [ngSwitch]="name">
        <path
          *ngSwitchCase="'share'"
          d="M16 2 L16 20 M9 9 L16 2 L23 9 M6 16 v11 a2 2 0 0 0 2 2 h16 a2 2 0 0 0 2-2 V16"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        />
        <path
          *ngSwitchCase="'heart'"
          d="M16 28 C16 28 3 20 3 11.5 C3 6.8 6.8 3 11.4 3 C13.9 3 16 4.3 16 4.3 C16 4.3 18.1 3 20.6 3 C25.2 3 29 6.8 29 11.5 C29 20 16 28 16 28 Z"
          stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"
        />
        <path
          *ngSwitchCase="'heart-filled'"
          d="M16 28 C16 28 3 20 3 11.5 C3 6.8 6.8 3 11.4 3 C13.9 3 16 4.3 16 4.3 C16 4.3 18.1 3 20.6 3 C25.2 3 29 6.8 29 11.5 C29 20 16 28 16 28 Z"
          fill="currentColor"
        />
        <path
          *ngSwitchCase="'star'"
          d="M16 2 L19.9 11.5 L30 12.4 L22.3 19.2 L24.6 29 L16 23.7 L7.4 29 L9.7 19.2 L2 12.4 L12.1 11.5 Z"
          fill="currentColor"
        />
        <rect *ngSwitchCase="'grid'" x="3" y="3" width="11" height="11" rx="2" fill="currentColor" />
        <rect *ngSwitchCase="'grid'" x="18" y="3" width="11" height="11" rx="2" fill="currentColor" />
        <rect *ngSwitchCase="'grid'" x="3" y="18" width="11" height="11" rx="2" fill="currentColor" />
        <rect *ngSwitchCase="'grid'" x="18" y="18" width="11" height="11" rx="2" fill="currentColor" />
        <path
          *ngSwitchCase="'close'"
          d="M6 6 L26 26 M26 6 L6 26"
          stroke="currentColor" stroke-width="2" stroke-linecap="round"
        />
        <path
          *ngSwitchCase="'chevron-left'"
          d="M20 4 L10 16 L20 28"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"
        />
        <path
          *ngSwitchCase="'chevron-right'"
          d="M12 4 L22 16 L12 28"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"
        />
        <path
          *ngSwitchCase="'arrow-left'"
          d="M26 16 H6 M6 16 L14 8 M6 16 L14 24"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"
        />
      </ng-container>
    </svg>
  `,
})
export class IconComponent {
  @Input() name: IconName = 'star';
  @Input() size = 16;
}
