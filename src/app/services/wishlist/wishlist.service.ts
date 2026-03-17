import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { CachingService } from '../persistence/caching-service';
import { Wishlist, WishlistItem } from './wishlist.model';
import { ApiProduct } from '../products/products.model';

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
  });
  readonly wishlistedItemsCount = computed(() => this.wishlist()?.items.length ?? 0);

  isWishlistedItem(product: ApiProduct): boolean {
    const wishlist = this.#getWishList();
    if (!wishlist) {
      return false;
    }
    return wishlist.items.some(existingWishlistedItem => existingWishlistedItem.id === product.id);
  }

  getWishlistedItem(product: ApiProduct): WishlistItem | null {
    const wishlist = this.#getWishList();
    if (!wishlist) {
      return null;
    }
    return wishlist.items.find(existingWishlistedItem => existingWishlistedItem.id === product.id) ?? null;
  }

  updateWishlistItemAmount(wishlistItem: WishlistItem, amount: number): void {
    const wishlist = this.#getWishList();
    if (!wishlist) {
      return;
    }
    const updatedList = [...wishlist.items];
    this.#updateWishList({
      items: updatedList.map(item => (item.id === wishlistItem.id ? { ...wishlistItem, amount } : item)),
    });
  }

  addToWishlist(product: ApiProduct): void {
    const wishlist = this.#getWishList();
    // if the item is already wishlisted, return
    if (this.isWishlistedItem(product)) {
      return;
    }
    // updates the isWishlisted property as well
    const newWishlistItem = { ...product, isWishlisted: true, amount: 1 };
    // if there is no wishlist yet, we create a new one
    if (!wishlist) {
      return this.#updateWishList({ items: [newWishlistItem] });
    }
    const updatedList = [...wishlist.items];
    updatedList.push(newWishlistItem);
    this.#updateWishList({ items: updatedList });
  }

  removeFromWishlist(product: ApiProduct): void {
    const wishlist = this.#getWishList();
    // if there is no wishlist yet, we can also no remove anything from it so return
    if (!wishlist) {
      return;
    }
    // if the item is NOT already wishlisted, return
    if (!this.isWishlistedItem(product)) {
      return;
    }
    const updatedList = [...wishlist.items];
    const filteredList = updatedList.filter(wishlistItem => wishlistItem.id !== product.id);
    this.#updateWishList({ items: filteredList });
  }

  #getWishList(): Wishlist | null {
    return this.#cachingService.naiveGetCache<Wishlist>(PRODUCT_CACHE_KEY) ?? null;
  }

  #updateWishList(updatedWishList: Wishlist): void {
    this.#cachingService.naiveSetCache<Wishlist>(PRODUCT_CACHE_KEY, updatedWishList);
    this.#wishList.update(() => updatedWishList);
  }
}
