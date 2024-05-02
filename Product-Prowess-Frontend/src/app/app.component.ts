import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeAnimation',[
      state('visible', style({opacity: 1})),
      state('hidden', style({opacity: 0})),
      transition('hidden => visible', animate('0.3s ease-in')),
      transition('visible => hidden', animate('0.3s ease-out'))
    ])
  ]
})
export class AppComponent {
  showForm: boolean = false;

  constructor(private router: Router){}

  showFormRegister(): void {
    this.showForm = true;
  }
}
