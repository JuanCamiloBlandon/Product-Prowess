import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-imageselector',
  templateUrl: './imageselector.component.html',
  styleUrls: ['./imageselector.component.css']
})
export class ImageselectorComponent {
  @Output() imageSelected: EventEmitter<string> = new EventEmitter<string>();

  imagesPrduct: string[] = [
    'assets/imageproducts/aspiradora.png',
    'assets/imageproducts/blusa.png',
    'assets/imageproducts/camara.png',
    'assets/imageproducts/camisa.png',
    'assets/imageproducts/celular.png',
    'assets/imageproducts/diadema.png',
    'assets/imageproducts/lavadora.png',
    'assets/imageproducts/manilla.png',
    'assets/imageproducts/nevera.png',
    'assets/imageproducts/pantalon.png',
    'assets/imageproducts/portatil.png',
    'assets/imageproducts/tablet.png',
    'assets/imageproducts/televisor.png',
    'assets/imageproducts/zapato.png'
  ];

  ngOnInit(){
    this.imagesPrduct.forEach(image =>console.log(image));
  }

  selectImage(image: string){
    this.imageSelected.emit(image);
  }

}
