import { Injectable } from '@angular/core';
import { products } from '../../../assets/products.json';
import { ApiProduct } from './products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  getProducts(): ApiProduct[] {
    return products;
  }
}
