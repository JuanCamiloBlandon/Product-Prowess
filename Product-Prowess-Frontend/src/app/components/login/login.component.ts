import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from '../../login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  @Input() showLogin: boolean = false;
  @Output() showLoginModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  email = '';
  password = '';

  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
    private router: Router
  ) { };

  closeLoginMdal(): void {
    this.showLogin = false;
    this.showLoginModal.emit(this.showLogin);
  }

  onSubmit(): void {
    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        if (response.ok) {
          localStorage.setItem('token', response.token);
          this.showSuccessMessage('Iniciando');
          this.router.navigate(['/dashboard']);
        } else {
          this.showErrorMessage('Error al registrar el usuario');
        }
      },
       (error) => {
        console.error('Error Logueando usuario', error);

        this.showErrorMessage('Error al registrar el usuario');
      }
    );
  }

  public showSuccessMessage(message: string): void {
    this.messageService.add({ severity: 'success', detail: message });
  }

  private showErrorMessage(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
