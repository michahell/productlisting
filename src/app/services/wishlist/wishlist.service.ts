import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { CachingService } from '../persistence/caching-service';
import { Wishlist, WishlistItem } from './wishlist.model';

const PRODUCT_CACHE_KEY = 'OBFUSCATED_CACHE_KEY';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  readonly #cachingService = inject(CachingService);

  readonly #wishList = signal(this.#getWishList());
  readonly wishlist = linkedSignal<Wishlist | null, Wishlist | null>({
    source: this.#wishList,
    computation: this.#getWishList.bind(this),
    equal: this.#naiveIsEqualWishlist,
  });

  addToWishlist(wishlistItem: WishlistItem): void {
    const wishlist = this.#getWishList();
    if (!wishlist) {
      return this.#updateWishList({ items: [wishlistItem] });
    }
    const updatedList = { ...wishlist.items };
    updatedList.push(wishlistItem);
    this.#updateWishList({ items: updatedList });
  }

  removeFromWishlist(wishlistItem: WishlistItem): void {
    const wishlist = this.#getWishList();
    if (!wishlist) {
      return;
    }
    const updatedList = { ...wishlist.items };
    updatedList.splice(updatedList.indexOf(wishlistItem), 1);
    this.#updateWishList({ items: updatedList });
  }

  #getWishList(): Wishlist | null {
    return this.#cachingService.naiveGetCache<Wishlist>(PRODUCT_CACHE_KEY) ?? null;
  }

  #updateWishList(updatedWishList: Wishlist): void {
    this.#cachingService.naiveSetCache<Wishlist>(PRODUCT_CACHE_KEY, updatedWishList);
    // this.#wishlist.update();
  }

  #naiveIsEqualWishlist(a: Wishlist | null, b: Wishlist | null): boolean {
    if (!a || !b) {
      throw new Error('neither wishlist can be null');
    }
    return a.items.length === b.items.length;
  }
}
