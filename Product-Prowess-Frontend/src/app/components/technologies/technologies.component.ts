import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { MessageService } from 'primeng/api';

export interface Product {
  _id: string;
  userId: string;
  productName: string;
  description: string;
  tags: string[];
  image: string;
  url: string;
}

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']

})

export class TechnologiesComponent implements OnInit {
  newProduct: any = {
    productName: '',
    description: '',
    url: '',
    tags: '',
    category: '',
    image: ''
  };

  showImageSelector: boolean = false;
  isLoading: boolean = false;

  @Output() modalClosed = new EventEmitter<void>();

  constructor(
    private productService: ProductsService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void { }

  createProduct(): void {
    if (!this.isValidForm()) {
      return;
    }

    this.isLoading = true;
    this.newProduct.url = 'https://www.amazon.com/-/es/';

    this.productService.createProduct(this.newProduct).subscribe(response => {
      console.log('Producto creado', response);
      setTimeout(() => {
        this.isLoading = false;
        this.showSuccessMessage('Producto creado exitosamente');
        this.clearForm();
      }, 5000); 
    }, error => {
      console.error('Error al crear el producto', error);
      this.isLoading = false;
      if (error.status === 409) {
        this.showExistProduct('El producto ya existe');
      } else {
        this.showErrorMessage('Error al crear el producto');
      }
    });
  }

  public showSuccessMessage(message: string): void {
    this.messageService.add({ severity: 'success', detail: message });
  }

  private showErrorMessage(message: string): void {
    this.messageService.add({ severity: 'error', detail: message });
  }

  private showExistProduct(message: string): void {
    this.messageService.add({ severity: 'info', detail: message });
  }

  toggleImageSelector(): void {
    this.showImageSelector = !this.showImageSelector;
  }

  onImageSelected(image: string): void {
    this.newProduct.image = image;
    this.showImageSelector = false;
  }

  closeModal(): void {
    this.modalClosed.emit();
  }

  cancelAction(): void {
    console.log('Llamando el cierre');
    window.location.href = '/dashboard';
  }

  clearForm(): void {
    this.newProduct = {
      productName: '',
      description: '',
      url: '',
      tags: '',
      category: '',
      image: ''
    };
  }

  isValidForm(): boolean {
    return this.newProduct.productName && this.newProduct.description;
  }
}
