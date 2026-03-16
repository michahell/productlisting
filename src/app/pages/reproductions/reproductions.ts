import { Component, computed, inject } from '@angular/core';
import { Product } from '../../components/product/product';
import { ApiProduct } from '../../services/products/products.model';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { ReproductionsComponentFacade } from '../../services/reproductions/reproductions.component.facade';

@Component({
  selector: 'app-reproductions',
  imports: [Product],
  templateUrl: './reproductions.html',
  styleUrl: './reproductions.css',
})
export default class Reproductions {
  readonly #wishlistService = inject(WishlistService);
  readonly #reproductionsFacade = inject(ReproductionsComponentFacade);
  readonly reproductions = computed(() => this.#reproductionsFacade.reproductions());

  onProductWishlisted(product: ApiProduct): void {
    if (this.#wishlistService.isWishlistedItem(product)) {
      this.#wishlistService.removeFromWishlist(product);
    } else {
      this.#wishlistService.addToWishlist(product);
    }
  }
}
