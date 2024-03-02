import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import Product from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  jsonURL = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.jsonURL);
  }

}
