import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, signal } from '@angular/core';

interface CalendarDay {
  date: Date;
  inCurrentMonth: boolean;
  disabled: boolean;
}

@Component({
  selector: 'app-booking-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-calendar.component.html',
  styleUrl: './booking-calendar.component.scss',
})
export class BookingCalendarComponent implements OnChanges {
  @Input() checkIn: Date | null = null;
  @Input() checkOut: Date | null = null;
  /** Dates that render as unavailable (struck through, unclickable) — purely visual, matches the reference. */
  @Input() disabledDates: Date[] = [];

  @Output() rangeChange = new EventEmitter<{ checkIn: Date | null; checkOut: Date | null }>();

  protected readonly leftMonth = signal(new Date(2026, 9, 1)); // October 2026, matches the reference

  private readonly weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  protected readonly weekdays = this.weekdayLabels;

  ngOnChanges(): void {
    if (this.checkIn) {
      this.leftMonth.set(new Date(this.checkIn.getFullYear(), this.checkIn.getMonth(), 1));
    }
  }

  protected get rightMonth(): Date {
    const left = this.leftMonth();
    return new Date(left.getFullYear(), left.getMonth() + 1, 1);
  }

  protected monthLabel(month: Date): string {
    return month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  protected daysFor(month: Date): CalendarDay[] {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const days: CalendarDay[] = [];
    for (let i = 0; i < startOffset; i++) {
      days.push({ date: new Date(year, monthIndex, i - startOffset + 1), inCurrentMonth: false, disabled: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, monthIndex, d);
      days.push({ date, inCurrentMonth: true, disabled: this.isDisabled(date) });
    }
    return days;
  }

  private isDisabled(date: Date): boolean {
    return this.disabledDates.some((d) => this.isSameDay(d, date));
  }

  protected isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  protected isStart(date: Date): boolean {
    return !!this.checkIn && this.isSameDay(date, this.checkIn);
  }

  protected isEnd(date: Date): boolean {
    return !!this.checkOut && this.isSameDay(date, this.checkOut);
  }

  protected isInRange(date: Date): boolean {
    if (!this.checkIn || !this.checkOut) return false;
    return date > this.checkIn && date < this.checkOut;
  }

  protected selectDay(day: CalendarDay): void {
    if (day.disabled || !day.inCurrentMonth) return;

    if (!this.checkIn || (this.checkIn && this.checkOut)) {
      this.rangeChange.emit({ checkIn: day.date, checkOut: null });
      return;
    }

    if (day.date <= this.checkIn) {
      this.rangeChange.emit({ checkIn: day.date, checkOut: null });
      return;
    }

    this.rangeChange.emit({ checkIn: this.checkIn, checkOut: day.date });
  }

  protected prevMonth(): void {
    const left = this.leftMonth();
    this.leftMonth.set(new Date(left.getFullYear(), left.getMonth() - 1, 1));
  }

  protected nextMonth(): void {
    const left = this.leftMonth();
    this.leftMonth.set(new Date(left.getFullYear(), left.getMonth() + 1, 1));
  }

  protected clear(): void {
    this.rangeChange.emit({ checkIn: null, checkOut: null });
  }
}
