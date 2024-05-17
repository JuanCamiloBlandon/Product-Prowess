import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RegisterService } from '../../services/register.service';



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


  constructor(
    private messageService: MessageService,
    private registerService: RegisterService
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
          this.resetForm();
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
    this.username = '';
    this.email = '';
    this.password = '';
    this.bio = '';
    this.avatar = '';
  }
}
