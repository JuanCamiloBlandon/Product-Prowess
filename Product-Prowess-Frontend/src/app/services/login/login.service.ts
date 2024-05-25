import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/api/v1/auth/logIn';
  
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any>{
    console.log('Sending login request to:', this.apiUrl);
    return this.http.post<any>(this.apiUrl, {email, password});
  }

  logout(): void {
    localStorage.removeItem('token');
  }

}
