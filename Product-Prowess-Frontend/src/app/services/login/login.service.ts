import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/api/v1/auth/logIn';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) { }

  login(email: string, password: string): Observable<any>{
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        }
      }),
      switchMap(response => {
        if (response && response.token && response.userId) {
          const userId = response.userId;
          localStorage.setItem('userId', userId);
          return this.userService.getUserDetails(userId).pipe(
            tap(userData => {
              if (userData) {
                response.userDetails = userData;
              }
            })
          );
        } else {
          throw new Error('Invalid response from login API');
        }
      })
    );
  }
}