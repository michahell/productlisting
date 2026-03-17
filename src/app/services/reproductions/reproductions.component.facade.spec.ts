import { TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { signal } from '@angular/core';
import { ReproductionsComponentFacade } from './reproductions.component.facade';
import { WishlistService } from '../wishlist/wishlist.service';
import { ProductsService } from '../products/products.service';
import { ApiProduct } from '../products/products.model';

describe('ReproductionsComponentFacade', () => {
  let service: ReproductionsComponentFacade;
  let wishlistServiceMock: any;
  let productsServiceMock: any;

  const mockProduct: ApiProduct = {
    id: '1',
    title: 'Test Product',
    artist: 'Test Artist',
    style: 'Test Style',
    price: 100,
    dimensions_cm: { width: 10, height: 20 },
    medium: 'Oil',
    year_original: 2020,
    stock_level: 5,
    tags: ['tag1'],
    description: 'Description',
    thumbnailUrl: 'url',
  };

  beforeEach(() => {
    wishlistServiceMock = {
      wishlist: signal({ items: [] }),
      isWishlistedItem: vi.fn(),
      getWishlistedItem: vi.fn(),
    };

    productsServiceMock = {
      getProducts: vi.fn().mockReturnValue([mockProduct]),
    };

    TestBed.configureTestingModule({
      providers: [
        ReproductionsComponentFacade,
        { provide: WishlistService, useValue: wishlistServiceMock },
        { provide: ProductsService, useValue: productsServiceMock },
      ],
    });
    service = TestBed.inject(ReproductionsComponentFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide mapped reproductions', () => {
    wishlistServiceMock.isWishlistedItem.mockReturnValue(true);
    wishlistServiceMock.getWishlistedItem.mockReturnValue({ ...mockProduct, isWishlisted: true, amount: 2 });

    const result = service.reproductions();
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('1');
    expect(result[0].isWishlisted).toBe(true);
    expect(result[0].amount).toBe(2);
  });

  it('should default amount to 1 if not wishlisted', () => {
    wishlistServiceMock.isWishlistedItem.mockReturnValue(false);
    wishlistServiceMock.getWishlistedItem.mockReturnValue(null);

    const result = service.reproductions();
    expect(result[0].isWishlisted).toBe(false);
    expect(result[0].amount).toBe(1);
  });

  it('should update reproductions when wishlist changes', () => {
    wishlistServiceMock.isWishlistedItem.mockReturnValue(false);
    let result = service.reproductions();
    expect(result[0].isWishlisted).toBe(false);

    wishlistServiceMock.isWishlistedItem.mockReturnValue(true);
    wishlistServiceMock.wishlist.set({ items: [{ ...mockProduct, amount: 1 }] });

    result = service.reproductions();
    expect(result[0].isWishlisted).toBe(true);
  });
});
