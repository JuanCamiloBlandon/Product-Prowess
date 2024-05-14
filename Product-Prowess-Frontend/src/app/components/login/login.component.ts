import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  @Input() showLogin: boolean = false;
  @Output() showLoginModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeLoginMdal(): void {
    this.showLogin = false;
    this.showLoginModal.emit(this.showLogin);
  }

}
