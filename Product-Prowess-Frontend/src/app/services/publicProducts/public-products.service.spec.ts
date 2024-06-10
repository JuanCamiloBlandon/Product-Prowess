import { TestBed } from '@angular/core/testing';

import { PublicProductsService } from './public-products.service';

describe('PublicProductsService', () => {
  let service: PublicProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
