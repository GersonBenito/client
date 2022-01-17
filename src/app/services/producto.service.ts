import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url: string = `${env.baseUrl}/producto`;

  constructor(

    private http: HttpClient,

  ) { }

  getProducts(): Observable<any>{

    return this.http.get(`${this.url}`);

  }

  deleteProduct(_id: string): Observable<any>{

    return this.http.delete(`${this.url}/${_id}`);

  }

  addProduct(producto: Producto): Observable<any>{

    return this.http.post(this.url, producto);

  }

  getProductById(_id: string): Observable<any>{
    
    return this.http.get(`${this.url}/${_id}`);

  }

  updateProduct(_id: string, producto: Producto): Observable<any>{

    return this.http.put(`${this.url}/${_id}`, producto);

  }

}
