import { Component, input, output } from '@angular/core';
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
import { CurrencyPipe } from '@angular/common';
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
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  readonly hlmLarge = hlmLarge;

  product = input.required<ApiProduct>();
  favourited = output<ApiProduct>();

  onWishlisted(product: ApiProduct): void {
    console.log('Wishlist clicked');
    this.favourited.emit(product);
  }
}
