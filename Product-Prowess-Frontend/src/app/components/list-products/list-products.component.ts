import { Component, Input, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { Product } from '../technologies/technologies.component';
import { ProductdetailsComponent } from '../productdetails/productdetails.component';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
  providers: [DialogService]
})
export class ListProductsComponent implements OnInit, AfterViewInit {
  @Input() products: Product[] = [];

  constructor(public config: DynamicDialogConfig, private renderer: Renderer2, private el: ElementRef, private dialogService: DialogService) { }

  ngOnInit(): void {
    if (this.config.data && this.config.data.products) {
      this.products = this.config.data.products;
    }
  }

  redirectToProductUrl(url: string, mouseEvent: MouseEvent): void {
    const button = mouseEvent.currentTarget as HTMLElement;
    const rippleContainer = button.querySelector('.ripple') as HTMLElement;

    if (button.classList.contains('shopping-cart')) {
      this.createRipple(mouseEvent, rippleContainer);
    }

    setTimeout(() => {
      window.open(url, '_blank');
    }, 600);
  }

  showProductDetails(product: Product, mouseEvent: MouseEvent): void {
    const button = mouseEvent.currentTarget as HTMLElement;
    const rippleContainer = button.querySelector('.ripple') as HTMLElement;

    if (button.classList.contains('custom-button')) {
      this.createRipple(mouseEvent, rippleContainer);
    }

    setTimeout(() => {
      this.dialogService.open(ProductdetailsComponent, {
        header: 'Detalles del Producto',
        width: '40vw',
        data: {
          product: product
        }
      });
    }, 600);
  }

  ngAfterViewInit() {
    const buttons = this.el.nativeElement.querySelectorAll('.custom-button, .shopping-cart');
    buttons.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', (event) => this.createRipple(event, button));
    });
  }

  createRipple(event: MouseEvent, button: HTMLElement) {
    const ripple = button.querySelector('.ripple') as HTMLElement;

    if (!ripple) {
      return;
    }

    const rect = button.getBoundingClientRect();
    const size = rect.width;
    const x = (event.clientX - rect.left) - size / 2;
    const y = (event.clientY - rect.top) - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ripple.classList.remove('active');
    ripple.offsetWidth;
    ripple.classList.add('active');
  }
}
