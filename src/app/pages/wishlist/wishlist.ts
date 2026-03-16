import { Component, computed, inject } from '@angular/core';
import { Product } from '../../components/product/product';
import { WishlistService } from '../../services/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  imports: [Product],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export default class Wishlist {
  readonly #wishlistService = inject(WishlistService);
  readonly wishlistItems = computed(() => this.#wishlistService.wishlist()?.items ?? []);
}
