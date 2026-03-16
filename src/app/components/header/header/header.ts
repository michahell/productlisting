import { Component } from '@angular/core';
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
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmBadge } from '@spartan-ng/helm/badge';
import {
  HlmNavigationMenu,
  HlmNavigationMenuContent,
  HlmNavigationMenuItem,
  HlmNavigationMenuLink,
  HlmNavigationMenuList,
  HlmNavigationMenuPortal,
  HlmNavigationMenuTrigger,
} from '@spartan-ng/helm/navigation-menu';

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
    HlmInput,
    HlmSheetFooter,
    HlmLabel,
    HlmSheetClose,
    HlmBadge,
    HlmNavigationMenu,
    HlmNavigationMenuList,
    HlmNavigationMenuItem,
    HlmNavigationMenuTrigger,
    HlmNavigationMenuContent,
    HlmNavigationMenuPortal,
    HlmNavigationMenuLink,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
