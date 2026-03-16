import { Component, computed, inject } from '@angular/core';
import { Product } from '../../components/product/product';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { HlmItem, HlmItemActions, HlmItemContent, HlmItemDescription, HlmItemTitle } from '@spartan-ng/helm/item';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-wishlist',
  imports: [Product, HlmItem, HlmItemContent, HlmItemTitle, HlmItemDescription, HlmItemActions, HlmButton],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export default class Wishlist {
  readonly #wishlistService = inject(WishlistService);
  readonly wishlistItems = computed(() => this.#wishlistService.wishlist()?.items ?? []);
}
