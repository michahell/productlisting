import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Product } from './product';
import { ApiProduct } from '../../services/products/products.model';
import { provideIcons } from '@ng-icons/core';
import { lucideHeart } from '@ng-icons/lucide';

describe('ProductComponent', () => {
  let component: Product;
  let fixture: ComponentFixture<Product>;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Product],
      providers: [provideIcons({ lucideHeart })],
    }).compileComponents();

    fixture = TestBed.createComponent(Product);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', mockProduct);
    fixture.componentRef.setInput('canBeWishlisted', true);
    fixture.detectChanges();
  });

  it('should emit favourited when onWishlisted is called', () => {
    const emitSpy = vi.spyOn(component.favourited, 'emit');
    component.onWishlisted(mockProduct);
    expect(emitSpy).toHaveBeenCalledWith(mockProduct);
  });

  it('should emit deleted when onDeleted is called', () => {
    const emitSpy = vi.spyOn(component.deleted, 'emit');
    component.onDeleted(mockProduct);
    expect(emitSpy).toHaveBeenCalledWith(mockProduct);
  });

  it('should emit amountChanged when amountControl value changes', () => {
    const emitSpy = vi.fn();
    component.amountChanged.subscribe(emitSpy);
    component.amountControl.setValue(5);
    expect(emitSpy).toHaveBeenCalledWith(5);
  });
});
