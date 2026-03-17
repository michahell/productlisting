import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Reproductions from './reproductions';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { ReproductionsComponentFacade } from '../../services/reproductions/reproductions.component.facade';
import { Component, input, output, signal } from '@angular/core';
import { Product } from '../../components/product/product';

@Component({
  selector: 'app-product',
  template: '',
})
class MockProduct {
  readonly product = input.required();
  readonly canBeWishlisted = input.required();
  readonly isWishlisted = input<boolean>();
  readonly favourited = output();
}

describe('ReproductionsPage', () => {
  let component: Reproductions;
  let fixture: ComponentFixture<Reproductions>;
  let wishlistServiceMock: any;
  let reproductionsFacadeMock: any;

  const mockProduct = { id: '1', title: 'Test' } as any;

  beforeEach(async () => {
    wishlistServiceMock = {
      isWishlistedItem: vi.fn(),
      removeFromWishlist: vi.fn(),
      addToWishlist: vi.fn(),
    };

    reproductionsFacadeMock = {
      reproductions: signal([mockProduct]),
    };

    await TestBed.configureTestingModule({
      imports: [Reproductions],
      providers: [
        { provide: WishlistService, useValue: wishlistServiceMock },
        { provide: ReproductionsComponentFacade, useValue: reproductionsFacadeMock },
      ],
    })
      .overrideComponent(Reproductions, {
        remove: { imports: [Product] },
        add: { imports: [MockProduct] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Reproductions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add to wishlist if not already there', () => {
    wishlistServiceMock.isWishlistedItem.mockReturnValue(false);
    component.onProductWishlisted(mockProduct);
    expect(wishlistServiceMock.addToWishlist).toHaveBeenCalledWith(mockProduct);
  });

  it('should remove from wishlist if already there', () => {
    wishlistServiceMock.isWishlistedItem.mockReturnValue(true);
    component.onProductWishlisted(mockProduct);
    expect(wishlistServiceMock.removeFromWishlist).toHaveBeenCalledWith(mockProduct);
  });
});
