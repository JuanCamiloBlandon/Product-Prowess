import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

}
