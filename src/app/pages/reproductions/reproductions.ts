import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../components/product/product';
import { ApiProduct } from '../../services/products/products.model';
import { WishlistService } from '../../services/wishlist/wishlist.service';

@Component({
  selector: 'app-reproductions',
  imports: [Product],
  templateUrl: './reproductions.html',
  styleUrl: './reproductions.css',
})
export default class Reproductions {
  readonly #wishlistService = inject(WishlistService);
  readonly #productsService = inject(ProductsService);
  readonly products = toSignal(this.#productsService.getProducts());

  protected onProductFavourited(product: ApiProduct): void {
    console.log('Product favourited, ', product);
    this.#wishlistService.addToWishlist({ ...product, amount: 1 });
  }
}
