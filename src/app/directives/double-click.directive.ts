import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDoubleClick]'
})
export class DoubleClickDirective {
  @Output() doubleClick = new EventEmitter<Event>();

  private clickCount = 0;
  private clickTimeout: any;

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.clickCount++;

    if (this.clickCount === 1) {
      this.clickTimeout = setTimeout(() => {
        this.clickCount = 0;
      }, 100); // Temps pour considérer un double-clic (300 ms)
    } else if (this.clickCount === 2) {
      clearTimeout(this.clickTimeout);
      this.clickCount = 0;
      this.doubleClick.emit(event);
    }
  }
}
