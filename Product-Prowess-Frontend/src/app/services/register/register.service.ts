import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:3000/api/v1/users';

  constructor( private http: HttpClient) { }

  registerUser(userData: any):Observable<any>{
    return this.http.post<any>(this.apiUrl, userData);
  }
}
