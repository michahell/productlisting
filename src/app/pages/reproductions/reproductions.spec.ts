import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Reproductions from './reproductions';
import { ProductsService } from '../../services/products/products.service';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { of } from 'rxjs';
import { Component, input, output } from '@angular/core';
import { Product } from '../../components/product/product';

@Component({
  selector: 'app-product',
  template: '',
})
class MockProduct {
  readonly product = input.required();
  readonly canBeWishlisted = input.required();
  readonly favourited = output();
}

describe('ReproductionsPage', () => {
  let component: Reproductions;
  let fixture: ComponentFixture<Reproductions>;
  let productsServiceMock: any;
  let wishlistServiceMock: any;

  const mockProduct = { id: '1', title: 'Test' } as any;

  beforeEach(async () => {
    productsServiceMock = {
      getProducts: vi.fn().mockReturnValue(of([mockProduct])),
    };
    wishlistServiceMock = {
      hasWishlistedItem: vi.fn(),
      removeFromWishlist: vi.fn(),
      addToWishlist: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Reproductions],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: WishlistService, useValue: wishlistServiceMock },
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add to wishlist if not already there', () => {
    wishlistServiceMock.hasWishlistedItem.mockReturnValue(false);
    (component as any).onProductFavourited(mockProduct);
    expect(wishlistServiceMock.addToWishlist).toHaveBeenCalledWith({ ...mockProduct, amount: 1 });
  });

  it('should remove from wishlist if already there', () => {
    wishlistServiceMock.hasWishlistedItem.mockReturnValue(true);
    (component as any).onProductFavourited(mockProduct);
    expect(wishlistServiceMock.removeFromWishlist).toHaveBeenCalledWith(mockProduct);
  });
});
