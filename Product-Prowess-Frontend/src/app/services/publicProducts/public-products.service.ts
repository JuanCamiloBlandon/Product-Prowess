import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../components/technologies/technologies.component';

interface ApiResponse {
  msg: {
    products: Product[];
  };
  ok: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class PublicProductsService {

  private baseUrl = 'http://localhost:3000/api/v1'

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl}/products/public`);
  }
}
