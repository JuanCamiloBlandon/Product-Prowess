import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductdetailsComponent implements OnInit{

  product: any;
  displayId: string = '';
  formattedDate: string = '';
  creatorName: string = '';
  creatorAvatar: string = '';

  constructor(
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
      if(this.config.data && this.config.data.product){
        this.product = this.config.data.product;
        this.displayId = this.generateDisplayId(this.product._id);
        this.formattedDate = this.formatDate(this.product.createdAt);

        this.creatorName = this.product.publishedBy || 'Desconocido';
        this.creatorAvatar = this.product.publishedByAvatar;
      }
  }

  generateDisplayId(id: string): string{
    let hash = 0;
    for(let i = 0; i < id.length; i ++){
      hash = ((hash << 5)- hash) + id.charCodeAt(i);
      hash = hash & hash;
    }
    return (hash >>> 0).toString().slice(-4);
  }

  formatDate(date: string): string{
    return date.split('T')[0];
  }

  copyToClipboard(value: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.showInfoMessage("ID copiado correctamente");
  }

  private showInfoMessage(message: string): void {
    this.messageService.add({ severity: 'info', detail: message });
  }

  handleStarClick(): void {
    this.messageService.add({ severity: 'warn', detail: 'Para calificar el producto, debes iniciar sesión.' });
  }

  handleCommentsClick(): void {
    this.messageService.add({ severity: 'warn', detail: 'Para comentar el producto, debes iniciar sesión.' })
  }

  handleFollowClick(): void {
    this.messageService.add({ severity: 'warn', detail: 'Para poder segurilo(a), debes iniciar sesión.' })
  }


}
