import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { GetProductsService } from '../../services/getProducts/get-products.service';
import { Product } from '../technologies/technologies.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() showProducts: boolean = false;
  @Output() showProductModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  userName: string | null = null;
  userAvatar: string | null = null;
  isMenuOpen: boolean = false;
  showTechnologyModal: boolean = false;
  products: Product[] = [];
  

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];


  constructor(
    private router: Router,
    private userService: UserService,
    private getProductService: GetProductsService
  ) { }

  closeProductModal(): void {
    this.showProducts = false;
    this.showProductModal.emit(this.showProducts);
  }

  ngOnInit(): void {

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUserDetails(userId).subscribe(
        (userData) => {
          if (userData && userData.user && userData.user.username) {
            this.userName = userData.user.username;
            this.userAvatar = userData.user.avatar;
          } else {
            console.error('La estructura de los datos del usuario no es la esperada');
          }
        },
        (error) => {
          console.error('Error obteniendo detalles del usuario', error);
        }
      );

      this.getProductService.getUserProducts().subscribe(
        (response) => {
          if (response && response.msg && Array.isArray(response.msg.products)) {
            
            this.products = response.msg.products.filter(product => product.userId === userId); 
          } else {
            console.error('La respuesta del servidor no tiene la estructura esperada:', response);
          }
        },
        (error) => {
          console.error('Error obteniendo los productos del usuario', error);
        }
      );

    } else {
      console.error('No se encontró el ID de usuario en el localStorage');
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  openProductModal(): void {
    this.showTechnologyModal = true;
  }

  closeTechnologyModal(): void {
    this.showTechnologyModal = false;
  }


}
