import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  email: string = '';
  password: string = '';

  showSpinner: boolean = false;

  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
  ) { }

  closeLoginModal(): void {
    this.close.emit();
  }

  onSubmit(): void {

    this.showSpinner = true; 

    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.showSuccessMessage('Iniciando sesión...');

          setTimeout(() => {
            this.showSpinner = false;    
            window.location.href = '/dashboard';
          }, 7000 );
        } else {
          this.showErrorMessage('Error al iniciar sesión');
          this.showSpinner = false; 
        }
      },
      (error) => {
        console.error('Error iniciando sesión', error);
        this.showErrorMessage('Error al iniciar sesión');
        this.showSpinner = false; 
      }
    );
  }

  

  public showSuccessMessage(message: string): void {
    this.messageService.add({ severity: 'success', detail: message });
  }

  private showErrorMessage(message: string): void {
    this.messageService.add({ severity: 'error', detail: message });
  }

  private showExistUser(message: string): void {
    this.messageService.add({ severity: 'info', detail: message });
  }

  get isValidLogin(): boolean {
    return this.email.trim() !== '' && 
    this.password.trim() !== '';
  }
}
