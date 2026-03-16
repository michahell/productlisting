import { TestBed } from '@angular/core/testing';

import { ReproductionsComponentFacade } from './reproductions.component.facade';

describe('ReproductionsComponentFacade', () => {
  let service: ReproductionsComponentFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReproductionsComponentFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
