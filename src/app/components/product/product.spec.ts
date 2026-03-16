import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Product } from './product';
import { ApiProduct } from '../../services/products/products.model';
import { Component, input } from '@angular/core';
import {
  HlmCard,
  HlmCardHeader,
  HlmCardTitle,
  HlmCardDescription,
  HlmCardAction,
  HlmCardFooter,
  HlmCardContent,
} from '@spartan-ng/helm/card';
import { HlmToggle } from '@spartan-ng/helm/toggle';
import { NgIcon } from '@ng-icons/core';
import { HlmBadge } from '@spartan-ng/helm/badge';

@Component({ selector: 'hlm-card', template: '<ng-content />' })
class MockHlmCard {}

@Component({ selector: 'hlm-card-header', template: '<ng-content />' })
class MockHlmCardHeader {}

@Component({ selector: 'hlm-card-title', template: '<ng-content />' })
class MockHlmCardTitle {}

@Component({ selector: 'hlm-card-description', template: '<ng-content />' })
class MockHlmCardDescription {}

@Component({ selector: 'hlm-card-action', template: '<ng-content />' })
class MockHlmCardAction {}

@Component({ selector: 'hlm-card-footer', template: '<ng-content />' })
class MockHlmCardFooter {}

@Component({ selector: 'hlm-card-content', template: '<ng-content />' })
class MockHlmCardContent {}

@Component({ selector: 'hlm-toggle', template: '<ng-content />' })
class MockHlmToggle {}

@Component({ selector: 'ng-icon', template: '' })
class MockNgIcon {
  readonly name = input<string>();
}

@Component({ selector: 'hlm-badge', template: '<ng-content />' })
class MockHlmBadge {}

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
    })
      .overrideComponent(Product, {
        remove: {
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
            HlmBadge,
          ],
        },
        add: {
          imports: [
            MockHlmCard,
            MockHlmCardHeader,
            MockHlmCardTitle,
            MockHlmCardDescription,
            MockHlmCardAction,
            MockHlmCardFooter,
            MockHlmToggle,
            MockNgIcon,
            MockHlmCardContent,
            MockHlmBadge,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Product);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', mockProduct);
    fixture.componentRef.setInput('canBeWishlisted', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit favourited when onWishlisted is called', () => {
    const emitSpy = vi.spyOn(component.favourited, 'emit');
    component.onWishlisted(mockProduct);
    expect(emitSpy).toHaveBeenCalledWith(mockProduct);
  });
});
