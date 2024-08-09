import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Input() showModal: boolean = false;
  @Output() showModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  username: string = '';
  email: string = '';
  password: string = '';
  bio: string = '';
  avatar: string = '';
  showAvatarSelection: boolean = false;

  constructor(
    private messageService: MessageService,
    private registerService: RegisterService,
  ) { }

  closeRegisterModal(): void {
    this.close.emit();
  }

  registerUser(): void {
    this.registerService.register(this.username, this.email, this.password, this.bio, this.avatar).subscribe(
      (response) => {
        if (response.ok) {
          this.showSuccessMessage('Usuario registrado correctamente');
          window.location.href = '/';
        } else {
          this.showErrorMessage('Error al registrar el usuario');
        }
      },
      (error) => {
        this.showErrorMessage('Error al registrar el usuario');
      }
    );
  }
  

  public showSuccessMessage(message: string): void {
    this.messageService.add({ severity: 'success', detail: message });
  }

  private showErrorMessage(message: string): void {
    this.messageService.add({ severity: 'error', detail: message });
  }

  toggleAvatarSelection(): void {
    this.showAvatarSelection = !this.showAvatarSelection;
  }

  onAvatarSelected(avatar: string): void {
    this.avatar = avatar;
    this.showAvatarSelection = false;
  }

  get isFormValid(): boolean {
    return (
      this.username.trim() !== '' &&
      this.email.trim() !== '' &&
      this.password.trim() !== '' &&
      this.bio.trim() !== ''
    );
  }
}
