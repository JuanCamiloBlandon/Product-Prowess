import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError,tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../../components/technologies/technologies.component';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  private apiUrl = 'http://localhost:3000/api/v1/products';

  constructor(private http: HttpClient) { }

  getUserProducts(): Observable<{ ok: boolean, msg: { products: Product[] }}> {
    const token = localStorage.getItem('token');
  
    if (!token){
      return throwError('Missing token');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    return this.http.get<{ ok: boolean, msg: { products: Product[] } }>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching products:', error);
        return throwError(error); 
      })
    ).pipe(
      tap(response => {
        console.log('Response fron server: ', response);
      })
    );
  }
}
