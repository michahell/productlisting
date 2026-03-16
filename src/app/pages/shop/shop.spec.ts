import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Shop from './shop';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { Header } from '../../components/header/header/header';

@Component({
  selector: 'app-header',
  template: '',
})
class MockHeader {}

describe('ShopPage', () => {
  let component: Shop;
  let fixture: ComponentFixture<Shop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shop],
      providers: [provideRouter([])],
    })
      .overrideComponent(Shop, {
        remove: { imports: [Header] },
        add: { imports: [MockHeader] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Shop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
