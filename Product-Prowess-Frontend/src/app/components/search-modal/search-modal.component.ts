import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { PublicProductsService } from '../../services/publicProducts/public-products.service';
import { Product } from '../technologies/technologies.component';
import { ListProductsComponent } from '../list-products/list-products.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  products: Product[] = [];
  ref: DynamicDialogRef | undefined;
  date1: Date | undefined;
  
  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private productService: PublicProductsService 
  ){}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (response) => {
        this.products = response.msg.products;
      },
      (error) => {
        console.error('Error obteniendo productos:', error);
      }
    );
  }

  closeModal(): void {
    this.close.emit();
  }

  show(): void {
    this.ref = this.dialogService.open(ListProductsComponent, {
      header: 'Selecciona un producto',
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data: {
        products: this.products
      },
      templates: {
        footer: FooterComponent
      }
      
    });

    this.ref.onClose.subscribe((data: any) => {
      let summary_and_detail;
      if (data) {
        const buttonType = data?.buttonType;
        summary_and_detail = buttonType ? { summary: 'No Product Selected', detail: `Pressed '${buttonType}' button` } : { summary: 'Product Selected', detail: data?.name };
      } else {
        summary_and_detail = { summary: 'Ningún producto seleccionado'};
      }
      this.messageService.add({ severity: 'info', ...summary_and_detail, life: 3000 });
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }
   
}
