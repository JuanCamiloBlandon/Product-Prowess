import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string | null = null;
  userAvatar: string | null = null;
  isMenuOpen: boolean = false;

  constructor(
    private router: Router
  ){}

  ngOnInit() {
      this.userAvatar = localStorage.getItem('userAvatar');
      this.userName = localStorage.getItem('userName');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void{
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
