import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import {
  HlmSheet,
  HlmSheetClose,
  HlmSheetContent,
  HlmSheetDescription,
  HlmSheetFooter,
  HlmSheetHeader,
  HlmSheetPortal,
  HlmSheetTitle,
  HlmSheetTrigger,
} from '@spartan-ng/helm/sheet';
import { NgIcon } from '@ng-icons/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import {
  HlmNavigationMenu,
  HlmNavigationMenuItem,
  HlmNavigationMenuLink,
  HlmNavigationMenuList,
} from '@spartan-ng/helm/navigation-menu';
import { WishlistService } from '../../../services/wishlist/wishlist.service';
import { NgTemplateOutlet } from '@angular/common';
import { WishlistCarousel } from '../../wishlist-carousel/wishlist-carousel/wishlist-carousel';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    HlmButton,
    HlmSheet,
    HlmSheetContent,
    HlmSheetDescription,
    HlmSheetHeader,
    HlmSheetPortal,
    HlmSheetTitle,
    HlmSheetTrigger,
    NgIcon,
    HlmSheetFooter,
    HlmSheetClose,
    HlmBadge,
    HlmNavigationMenu,
    HlmNavigationMenuList,
    HlmNavigationMenuItem,
    HlmNavigationMenuLink,
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
