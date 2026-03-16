import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { products } from '../../../assets/products.json';
import { ApiProduct } from './products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  getProducts(): Observable<ApiProduct[]> {
    return of(products);
  }
}
