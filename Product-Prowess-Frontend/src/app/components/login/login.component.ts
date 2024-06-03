import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() showLogin: boolean = false;
  @Output() showLoginModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  email: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
    private router: Router
  ) { }

  closeLoginModal(): void {
    this.showLogin = false;
    this.showLoginModal.emit(this.showLogin);
  }

  onSubmit(): void {
    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.showSuccessMessage('Iniciando sesión...');
          window.location.href = '/dashboard';
        } else {
          this.showErrorMessage('Error al iniciar sesión');
        }
      },
      (error) => {
        console.error('Error iniciando sesión', error);
        this.showErrorMessage('Error al iniciar sesión');
      }
    );
  }

  public showSuccessMessage(message: string): void {
    this.messageService.add({ severity: 'success', detail: message });
  }

  private showErrorMessage(message: string): void {
    this.messageService.add({ severity: 'error', detail: message });
  }

  get isValidLogin(): boolean {
    return this.email.trim() !== '' && 
    this.password.trim() !== '';
  }
}
