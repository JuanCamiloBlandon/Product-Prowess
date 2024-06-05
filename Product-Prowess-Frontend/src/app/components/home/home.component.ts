import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeAnimation',[
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition('hidden => visible', animate('0.3s ease-in')),
      transition('visible => hidden', animate('0.3s ease-out'))
    ])
  ]
})
export class HomeComponent {
  showForm: boolean = false;
  showSearchModal: boolean = false;
  showRegisterModal: boolean = false;
  showLoginModal: boolean = false;

  @Output() registerModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() loginModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router){}

  closeLoginModal(): void {
    this.showLoginModal = false; 
  }

  closeRegisterModal(): void {
    this.showRegisterModal = false; 
  }

  toggleSearchModal(): void {
    this.showSearchModal = !this.showSearchModal;
  }

  toggleRegisterModal(): void{
    this.showRegisterModal = !this.showRegisterModal;
    this.registerModalChange.emit(this.showRegisterModal);
  }

  toggleLoginModal(): void {
    this.showLoginModal = !this.showLoginModal;
    this.loginModalChange.emit(this.showLoginModal);
  }

}
