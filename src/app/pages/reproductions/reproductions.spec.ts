import { ComponentFixture, TestBed } from '@angular/core/testing';
import Reproductions from './reproductions';

describe('ProductListing', () => {
  let component: Reproductions;
  let fixture: ComponentFixture<Reproductions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reproductions],
    }).compileComponents();

    fixture = TestBed.createComponent(Reproductions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
