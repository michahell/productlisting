import { Component, computed, inject } from '@angular/core';
import { Product } from '../../components/product/product';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { NgIcon } from '@ng-icons/core';
import { HlmItem, HlmItemActions, HlmItemContent, HlmItemDescription, HlmItemTitle } from '@spartan-ng/helm/item';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HlmNavigationMenuLink } from '@spartan-ng/helm/navigation-menu';

@Component({
  selector: 'app-wishlist',
  imports: [
    Product,
    NgIcon,
    HlmItem,
    HlmItemContent,
    HlmItemTitle,
    HlmItemDescription,
    HlmItemActions,
    HlmIcon,
    RouterLink,
    HlmNavigationMenuLink,
    RouterLinkActive,
  ],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export default class Wishlist {
  readonly #wishlistService = inject(WishlistService);
  readonly wishlistItems = computed(() => this.#wishlistService.wishlist()?.items ?? []);
}
