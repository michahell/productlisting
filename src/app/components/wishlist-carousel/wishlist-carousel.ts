import { Component, computed, inject } from '@angular/core';
import { HlmCarouselImports } from '@spartan-ng/helm/carousel';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmSheetClose } from '@spartan-ng/helm/sheet';
import { Product } from '../product/product';
import { WishlistService } from 'services/wishlist/wishlist.service';
import { WishlistItem } from 'services/wishlist/wishlist.model';

@Component({
  selector: 'app-wishlist-carousel',
  imports: [HlmCarouselImports, HlmItemImports, Product, HlmButton, HlmSheetClose],
  templateUrl: './wishlist-carousel.html',
  styleUrl: './wishlist-carousel.css',
})
export class WishlistCarousel {
  readonly #wishlistService = inject(WishlistService);
  readonly wishlistItems = computed(() => this.#wishlistService.wishlist()?.items ?? []);

  onDeleted(wishlistItem: WishlistItem): void {
    this.#wishlistService.removeFromWishlist(wishlistItem);
  }

  onAmountChanged(wishlistItem: WishlistItem, amount: number | null): void {
    this.#wishlistService.updateWishlistItemAmount(wishlistItem, amount ?? 1);
  }
}
