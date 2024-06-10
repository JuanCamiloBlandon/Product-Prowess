import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-footer',
  template: `
    <button pButton type="button" label="Cancelar" icon="pi pi-times" (click)="closeDialog()" class="p-button-text"></button>
  `,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private ref: DynamicDialogRef) {}

  closeDialog(): void {
    this.ref.close();
  }
}
