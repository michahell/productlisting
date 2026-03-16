import { TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { WishlistService } from './wishlist.service';
import { CachingService } from '../persistence/caching-service';
import { ApiProduct } from '../products/products.model';

describe('WishlistService', () => {
  let service: WishlistService;
  let cachingServiceMock: any;

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
    cachingServiceMock = {
      naiveGetCache: vi.fn(),
      naiveSetCache: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [WishlistService, { provide: CachingService, useValue: cachingServiceMock }],
    });
    service = TestBed.inject(WishlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('hasWishlistedItem', () => {
    it('should return true if item is in wishlist', () => {
      cachingServiceMock.naiveGetCache.mockReturnValue({ items: [{ ...mockProduct, amount: 1 }] });
      expect(service.isWishlistedItem(mockProduct)).toBe(true);
    });

    it('should return false if item is not in wishlist', () => {
      cachingServiceMock.naiveGetCache.mockReturnValue({ items: [] });
      expect(service.isWishlistedItem(mockProduct)).toBe(false);
    });

    it('should return false if wishlist is null', () => {
      cachingServiceMock.naiveGetCache.mockReturnValue(null);
      expect(service.isWishlistedItem(mockProduct)).toBe(false);
    });
  });

  describe('addToWishlist', () => {
    it('should add item to wishlist if not already present', () => {
      cachingServiceMock.naiveGetCache.mockReturnValue(null);
      service.addToWishlist({ ...mockProduct, amount: 1 });
      expect(cachingServiceMock.naiveSetCache).toHaveBeenCalledWith(expect.any(String), {
        items: [{ ...mockProduct, amount: 1 }],
      });
    });

    it('should not add item if already in wishlist', () => {
      cachingServiceMock.naiveGetCache.mockReturnValue({ items: [{ ...mockProduct, amount: 1 }] });
      service.addToWishlist({ ...mockProduct, amount: 1 });
      expect(cachingServiceMock.naiveSetCache).not.toHaveBeenCalled();
    });
  });

  describe('removeFromWishlist', () => {
    it('should remove item from wishlist', () => {
      cachingServiceMock.naiveGetCache.mockReturnValue({ items: [{ ...mockProduct, amount: 1 }] });
      service.removeFromWishlist(mockProduct);
      expect(cachingServiceMock.naiveSetCache).toHaveBeenCalledWith(expect.any(String), {
        items: [],
      });
    });

    it('should do nothing if item is not in wishlist', () => {
      cachingServiceMock.naiveGetCache.mockReturnValue({ items: [] });
      service.removeFromWishlist(mockProduct);
      expect(cachingServiceMock.naiveSetCache).not.toHaveBeenCalled();
    });
  });

  describe('wishlistItemsCount', () => {
    it('should return the correct count', () => {
      cachingServiceMock.naiveGetCache.mockReturnValue({ items: [{ id: '1' }, { id: '2' }] });
      // Trigger signal update if necessary, though in this service it's linked to a signal that gets updated on initialization and update
      expect(service.wishlistedItemsCount()).toBe(2);
    });
  });
});
