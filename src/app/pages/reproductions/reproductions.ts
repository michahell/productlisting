import { Component, inject } from '@angular/core';
import { ProductsService } from '../../products/products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../components/product/product';

@Component({
  selector: 'app-reproductions',
  imports: [Product],
  templateUrl: './reproductions.html',
  styleUrl: './reproductions.css',
})
export default class Reproductions {
  #productsService = inject(ProductsService);
  readonly products = toSignal(this.#productsService.getProducts());
}
