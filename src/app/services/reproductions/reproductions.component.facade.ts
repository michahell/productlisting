import { inject, Injectable, linkedSignal } from '@angular/core';
import { WishlistService } from '../wishlist/wishlist.service';
import { ProductsService } from '../products/products.service';
import { ApiProduct } from '../products/products.model';
import { ReproductionViewModel } from './reproductions.model';

@Injectable({
  providedIn: 'root',
})
export class ReproductionsComponentFacade {
  readonly #wishlistService = inject(WishlistService);
  readonly #productsService = inject(ProductsService);

  readonly reproductions = linkedSignal({
    source: this.#wishlistService.wishlist,
    computation: this.#getReproductions.bind(this),
  });

  #getReproductions(): ReproductionViewModel[] {
    return this.#productsService.getProducts().map(product => this.#mapApiProductToReproduction(product));
  }

  #mapApiProductToReproduction(product: ApiProduct): ReproductionViewModel {
    return { ...product, isWishlisted: this.#wishlistService.isWishlistedItem(product) };
  }
}
