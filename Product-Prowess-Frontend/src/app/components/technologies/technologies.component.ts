import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

export interface Product {
  _id: string;
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
  isLoadingMessage: string = 'Creando...';

  @Output() modalClosed = new EventEmitter<void>();

  constructor(
    private productService: ProductsService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  createProduct(): void {
    if (!this.isValidForm()) {
      return;
    }

    this.isLoading = true;

    this.newProduct.url = 'https://www.amazon.com/-/es/';

    setTimeout(() => {
      this.isLoading = false;
      this.isLoadingMessage = '';
      this.showSuccessMessage('Producto creado exitosamente');
      this.clearForm();
    }, 5000);

    this.isLoadingMessage = 'Creando...';

    this.productService.createProduct(this.newProduct).subscribe(response => {
      console.log('Producto creado', response);
      console.log('datos del producto creado: ', this.newProduct);

    }, error => {
      console.error('Error al crear el producto', error);
      this.isLoadingMessage = '';
      this.isLoading = false;
      this.showErrorMessage('Error al crear el producto');
    });
  }

  public showSuccessMessage(message: string): void {
    this.messageService.add({ severity: 'success', detail: message });
  }

  private showErrorMessage(message: string): void {
    this.messageService.add({ severity: 'error', detail: message });
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
      category: ''
    };
  }



  isValidForm(): boolean {
    return this.newProduct.productName && this.newProduct.description;
  }
}
