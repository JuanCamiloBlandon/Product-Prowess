import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private registerService: RegisterService,
    private route: ActivatedRoute
  ) { 
    this.route.queryParams.subscribe(params => {
      if(params['avatar']){
        this.avatar = params['avatar'];
      }
    });
  };

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
        console.log('Respuesta del servidor:', response);
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

  public showErrorMessage(message: string): void {
    this.messageService.add({ severity: 'error',  detail: message });
  }
  private resetForm(): void {
    console.log('Resetting form...');
    this.username = '';
    this.email = '';
    this.password = '';
    this.bio = '';
    this.avatar = '';
  }
}
