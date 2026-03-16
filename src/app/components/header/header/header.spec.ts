import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Header } from './header';
import { WishlistService } from '../../../services/wishlist/wishlist.service';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Component, input } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import {
  HlmSheet,
  HlmSheetClose,
  HlmSheetContent,
  HlmSheetDescription,
  HlmSheetFooter,
  HlmSheetHeader,
  HlmSheetPortal,
  HlmSheetTitle,
  HlmSheetTrigger,
} from '@spartan-ng/helm/sheet';
import { NgIcon } from '@ng-icons/core';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmBadge } from '@spartan-ng/helm/badge';
import {
  HlmNavigationMenu,
  HlmNavigationMenuItem,
  HlmNavigationMenuLink,
  HlmNavigationMenuList,
} from '@spartan-ng/helm/navigation-menu';

@Component({ selector: 'button[hlmBtn]', template: '<ng-content />' })
class MockHlmButton {}

@Component({ selector: 'hlm-sheet', template: '<ng-content />' })
class MockHlmSheet {}

@Component({ selector: 'hlm-sheet-close', template: '<ng-content />' })
class MockHlmSheetClose {}

@Component({ selector: 'hlm-sheet-content', template: '<ng-content />' })
class MockHlmSheetContent {}

@Component({ selector: 'hlm-sheet-description', template: '<ng-content />' })
class MockHlmSheetDescription {}

@Component({ selector: 'hlm-sheet-footer', template: '<ng-content />' })
class MockHlmSheetFooter {}

@Component({ selector: 'hlm-sheet-header', template: '<ng-content />' })
class MockHlmSheetHeader {}

@Component({ selector: 'hlm-sheet-portal', template: '<ng-content />' })
class MockHlmSheetPortal {}

@Component({ selector: 'hlm-sheet-title', template: '<ng-content />' })
class MockHlmSheetTitle {}

@Component({ selector: 'hlm-sheet-trigger', template: '<ng-content />' })
class MockHlmSheetTrigger {}

@Component({ selector: 'ng-icon', template: '' })
class MockNgIcon {
  readonly name = input<string>();
}

@Component({ selector: 'input[hlmInput]', template: '' })
class MockHlmInput {}

@Component({ selector: 'label[hlmLabel]', template: '<ng-content />' })
class MockHlmLabel {}

@Component({ selector: 'hlm-badge', template: '<ng-content />' })
class MockHlmBadge {}

@Component({ selector: 'hlm-navigation-menu', template: '<ng-content />' })
class MockHlmNavigationMenu {}

@Component({ selector: 'hlm-navigation-menu-item', template: '<ng-content />' })
class MockHlmNavigationMenuItem {}

@Component({ selector: 'hlm-navigation-menu-link', template: '<ng-content />' })
class MockHlmNavigationMenuLink {}

@Component({ selector: 'hlm-navigation-menu-list', template: '<ng-content />' })
class MockHlmNavigationMenuList {}

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
      providers: [{ provide: WishlistService, useValue: wishlistServiceMock }, provideRouter([])],
    })
      .overrideComponent(Header, {
        remove: {
          imports: [
            HlmButton,
            HlmSheet,
            HlmSheetContent,
            HlmSheetDescription,
            HlmSheetHeader,
            HlmSheetPortal,
            HlmSheetTitle,
            HlmSheetTrigger,
            NgIcon,
            HlmInput,
            HlmSheetFooter,
            HlmLabel,
            HlmSheetClose,
            HlmBadge,
            HlmNavigationMenu,
            HlmNavigationMenuList,
            HlmNavigationMenuItem,
            HlmNavigationMenuLink,
          ],
        },
        add: {
          imports: [
            MockHlmButton,
            MockHlmSheet,
            MockHlmSheetContent,
            MockHlmSheetDescription,
            MockHlmSheetHeader,
            MockHlmSheetPortal,
            MockHlmSheetTitle,
            MockHlmSheetTrigger,
            MockNgIcon,
            MockHlmInput,
            MockHlmSheetFooter,
            MockHlmLabel,
            MockHlmSheetClose,
            MockHlmBadge,
            MockHlmNavigationMenu,
            MockHlmNavigationMenuList,
            MockHlmNavigationMenuItem,
            MockHlmNavigationMenuLink,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect wishlisted items count from service', () => {
    expect(component.wishlistedItems()).toBe(5);
    wishlistServiceMock.wishlistedItemsCount.set(10);
    fixture.detectChanges();
    expect(component.wishlistedItems()).toBe(10);
  });
});
