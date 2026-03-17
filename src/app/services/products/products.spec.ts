import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService],
    });
    service = TestBed.inject(ProductsService);
  });

  describe('getProducts', () => {
    it('should return an array of products', () => {
      const products = service.getProducts();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });
  });
});
