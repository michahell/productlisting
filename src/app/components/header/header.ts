import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import { HlmNavigationMenuImports } from '@spartan-ng/helm/navigation-menu';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { NgIcon } from '@ng-icons/core';
import { WishlistService } from 'services/wishlist/wishlist.service';
import { WishlistCarousel } from '../wishlist-carousel/wishlist-carousel';

@Component({
  selector: 'app-header',
  imports: [
    HlmSheetImports,
    HlmNavigationMenuImports,
    RouterLink,
    RouterLinkActive,
    HlmButton,
    NgIcon,
    HlmBadge,
    NgTemplateOutlet,
    WishlistCarousel,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly #wishlistService = inject(WishlistService);

  wishlistedItems = computed(() => this.#wishlistService.wishlistedItemsCount());
}
