import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Header } from './header';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideHeart } from '@ng-icons/lucide';

describe('HeaderComponent', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let wishlistServiceMock: any;

  beforeEach(async () => {
    wishlistServiceMock = {
      wishlistedItemsCount: signal(5),
    };

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        { provide: WishlistService, useValue: wishlistServiceMock },
        provideRouter([]),
        provideIcons({ lucideHeart }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should reflect wishlisted items count from service', () => {
    expect(component.wishlistedItems()).toBe(5);
    wishlistServiceMock.wishlistedItemsCount.set(10);
    fixture.detectChanges();
    expect(component.wishlistedItems()).toBe(10);
  });
});
