import { TestBed } from '@angular/core/testing';

import { NavigationBarService } from './navigation-bar.service';

describe('NavigationBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavigationBarService = TestBed.get(NavigationBarService);
    expect(service).toBeTruthy();
  });
});
