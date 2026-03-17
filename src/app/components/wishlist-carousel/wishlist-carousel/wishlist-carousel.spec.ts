import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistCarousel } from './wishlist-carousel';

describe('WishlistCarousel', () => {
  let component: WishlistCarousel;
  let fixture: ComponentFixture<WishlistCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
