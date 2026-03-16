import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Wishlist from './wishlist';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { Component, input, output, signal } from '@angular/core';
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

describe('WishlistPage', () => {
  let component: Wishlist;
  let fixture: ComponentFixture<Wishlist>;
  let wishlistServiceMock: any;

  beforeEach(async () => {
    wishlistServiceMock = {
      wishlist: signal({ items: [{ id: '1', title: 'Test' }] }),
    };

    await TestBed.configureTestingModule({
      imports: [Wishlist],
      providers: [{ provide: WishlistService, useValue: wishlistServiceMock }],
    })
      .overrideComponent(Wishlist, {
        remove: { imports: [Product] },
        add: { imports: [MockProduct] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Wishlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get wishlist items from service', () => {
    expect(component.wishlistItems()).toEqual([{ id: '1', title: 'Test' }]);
  });
});
