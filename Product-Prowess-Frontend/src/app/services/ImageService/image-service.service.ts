import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  private images = [
    { name: 'Prodcut 1', url: 'assets/imageproducts/aspiradora.png'},
    { name: 'Prodcut 2', url: 'assets/imageproducts/blusa.png'},
    { name: 'Prodcut 3', url: 'assets/imageproducts/camara.png'},
    { name: 'Prodcut 4', url: 'assets/imageproducts/camisa.png'},
    { name: 'Prodcut 5', url: 'assets/imageproducts/celular.png'},
    { name: 'Prodcut 6', url: 'assets/imageproducts/diadema.png'},
    { name: 'Prodcut 7', url: 'assets/imageproducts/lavadora.png'},
    { name: 'Prodcut 8', url: 'assets/imageproducts/manilla.png'},
    { name: 'Prodcut 9', url: 'assets/imageproducts/nevera.png'},
    { name: 'Prodcut 10', url: 'assets/imageproducts/pantalon.png'},
    { name: 'Prodcut 11', url: 'assets/imageproducts/portatil.png'},
    { name: 'Prodcut 12', url: 'assets/imageproducts/tablet.png'},
    { name: 'Prodcut 13', url: 'assets/imageproducts/televisor.png'},
    { name: 'Prodcut 14', url: 'assets/imageproducts/zapato.png'}
  
  ];

  getImages(){
    return this.images;
  }
}
