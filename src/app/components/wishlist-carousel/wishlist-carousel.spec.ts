import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { WishlistCarousel } from './wishlist-carousel';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { Component, input, output, signal } from '@angular/core';
import { Product } from '../product/product';
import { WishlistItem } from '../../services/wishlist/wishlist.model';

@Component({
  selector: 'app-product',
  template: '',
})
class MockProduct {
  readonly product = input.required();
  readonly showsAmount = input<boolean>();
  readonly canBeDeleted = input<boolean>();
  readonly canHaveAdjustableAmount = input<boolean>();
  readonly amountWishlisted = input<number>();
  readonly deleted = output();
  readonly amountChanged = output();
}

describe('WishlistCarousel', () => {
  let component: WishlistCarousel;
  let fixture: ComponentFixture<WishlistCarousel>;
  let wishlistServiceMock: any;

  const mockWishlistItem: WishlistItem = {
    id: '1',
    title: 'Test',
    artist: 'Artist',
    style: 'Style',
    price: 100,
    dimensions_cm: { width: 10, height: 10 },
    medium: 'Medium',
    year_original: 2000,
    stock_level: 10,
    tags: [],
    description: '',
    thumbnailUrl: '',
    isWishlisted: true,
    amount: 1,
  };

  beforeEach(async () => {
    wishlistServiceMock = {
      wishlist: signal({ items: [mockWishlistItem] }),
      removeFromWishlist: vi.fn(),
      updateWishlistItemAmount: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [WishlistCarousel],
      providers: [{ provide: WishlistService, useValue: wishlistServiceMock }],
    })
      .overrideComponent(WishlistCarousel, {
        remove: { imports: [Product] },
        add: { imports: [MockProduct] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(WishlistCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get wishlist items from service', () => {
    expect(component.wishlistItems()).toEqual([mockWishlistItem]);
  });

  it('should call removeFromWishlist when onDeleted is called', () => {
    component.onDeleted(mockWishlistItem);
    expect(wishlistServiceMock.removeFromWishlist).toHaveBeenCalledWith(mockWishlistItem);
  });

  it('should call updateWishlistItemAmount when onAmountChanged is called', () => {
    component.onAmountChanged(mockWishlistItem, 5);
    expect(wishlistServiceMock.updateWishlistItemAmount).toHaveBeenCalledWith(mockWishlistItem, 5);
  });

  it('should call updateWishlistItemAmount with 1 if amount is null', () => {
    component.onAmountChanged(mockWishlistItem, null);
    expect(wishlistServiceMock.updateWishlistItemAmount).toHaveBeenCalledWith(mockWishlistItem, 1);
  });
});
