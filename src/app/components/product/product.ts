import { Component, computed, effect, input, output } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { hlmLarge } from '@spartan-ng/helm/typography';
import { HlmToggle } from '@spartan-ng/helm/toggle';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmButton } from '@spartan-ng/helm/button';
import { NgIcon } from '@ng-icons/core';
import { ApiProduct } from 'services/products/products.model';

@Component({
  selector: 'app-product',
  imports: [
    HlmCardImports,
    HlmToggle,
    NgIcon,
    CurrencyPipe,
    HlmBadge,
    NgClass,
    HlmInput,
    HlmLabel,
    HlmButton,
    ReactiveFormsModule,
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  readonly hlmLarge = hlmLarge;

  readonly product = input.required<ApiProduct>();

  readonly canBeWishlisted = input<boolean>();
  readonly canBeDeleted = input<boolean>();
  readonly canHaveAdjustableAmount = input<boolean>();
  readonly showsAmount = input<boolean>();
  readonly isWishlisted = input<boolean>();
  readonly amountWishlisted = input<number>();

  readonly amountControl: FormControl<number | null> = new FormControl<number>(0);

  readonly favourited = output<ApiProduct>();
  readonly amountChanged = outputFromObservable(this.amountControl.valueChanges);
  readonly deleted = output<ApiProduct>();

  constructor() {
    effect(() => {
      this.amountControl.setValue(this.amountWishlisted() ?? 1, { emitEvent: false });
    });
  }

  readonly wishlistStatus = computed(() => {
    const wishlistedClass = `bg-transparent *:[ng-icon]:*:[svg]:fill-red-500 *:[ng-icon]:*:[svg]:stroke-red-500`;
    return this.isWishlisted() ? wishlistedClass : '';
  });

  onWishlisted(product: ApiProduct): void {
    this.favourited.emit(product);
  }

  onDeleted(product: ApiProduct): void {
    this.deleted.emit(product);
  }
}
