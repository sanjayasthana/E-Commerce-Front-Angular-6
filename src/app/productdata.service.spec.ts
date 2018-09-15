import { TestBed } from '@angular/core/testing';

import { ProductdataService } from './productdata.service';

describe('ProductdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductdataService = TestBed.get(ProductdataService);
    expect(service).toBeTruthy();
  });
});
