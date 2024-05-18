import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Input() showModal: boolean = false;
  @Output() showModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  username: string = '';
  email: string = '';
  password: string = '';
  bio: string = '';
  avatar: string = '';
  showAvatarSelection: boolean = false;


  constructor(
    private messageService: MessageService,
    private registerService: RegisterService,
    private router: Router
  ) { };

  closeModal(): void {
    console.log('Cerrando el modal...');
    this.showModal = false;
    this.showModalChange.emit(this.showModal);
  }

  registerUser(): void {
  
    const formData = {
      username: this.username,
      email: this.email,
      password: this.password,
      bio: this.bio,
      avatar: this.avatar
    };
    console.log('Datos del formulario:', formData);
    this.registerService.registerUser(formData).subscribe(
      (response) => {
        if (response.ok) {
          this.showSuccessMessage('Usuario registrado correctamente');
          console.log('Redirigiendo al usuario a la página principal...');
          window.location.href = '/';
        } else {
          console.error('Error al registrar usuario', response.error.message);
          this.showErrorMessage('Error al registrar el usuario');
        }
      },
      (error) => {
        console.error('Error al registrar usuario', error);
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

  private resetForm(): void {
    console.log('Resetting form...');
    this.username = '';
    this.email = '';
    this.password = '';
    this.bio = '';
    this.avatar = '';
  }

  toggleAvatarSelection(): void {
    this.showAvatarSelection = !this.showAvatarSelection;
  }

  onAvatarSelected(avatar: string): void {
    this.avatar = avatar;
    this.showAvatarSelection = false;
  }
}
