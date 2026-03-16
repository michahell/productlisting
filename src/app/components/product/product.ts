import { Component, computed, input, output, signal } from '@angular/core';
import {
  HlmCard,
  HlmCardAction,
  HlmCardContent,
  HlmCardDescription,
  HlmCardFooter,
  HlmCardHeader,
  HlmCardTitle,
} from '@spartan-ng/helm/card';
import { ApiProduct } from '../../services/products/products.model';
import { HlmToggle } from '@spartan-ng/helm/toggle';
import { NgIcon } from '@ng-icons/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { hlmLarge } from '@spartan-ng/helm/typography';

@Component({
  selector: 'app-product',
  imports: [
    HlmCard,
    HlmCardHeader,
    HlmCardTitle,
    HlmCardDescription,
    HlmCardAction,
    HlmCardFooter,
    HlmToggle,
    NgIcon,
    HlmCardContent,
    CurrencyPipe,
    HlmBadge,
    NgClass,
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  readonly hlmLarge = hlmLarge;

  readonly product = input.required<ApiProduct>();
  readonly canBeWishlisted = input.required<boolean>();
  readonly isWishlisted = input<boolean>();
  readonly favourited = output<ApiProduct>();

  readonly wishlistStatus = computed(() => {
    const wishlistedClass = `bg-transparent *:[ng-icon]:*:[svg]:fill-red-500 *:[ng-icon]:*:[svg]:stroke-red-500`;
    return this.isWishlisted() ? wishlistedClass : '';
  });

  onWishlisted(product: ApiProduct): void {
    this.favourited.emit(product);
  }
}
