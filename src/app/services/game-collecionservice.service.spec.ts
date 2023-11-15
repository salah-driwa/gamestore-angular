import { TestBed } from '@angular/core/testing';

import { GameCollecionserviceService } from './game-collecionservice.service';

describe('GameCollecionserviceService', () => {
  let service: GameCollecionserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameCollecionserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
