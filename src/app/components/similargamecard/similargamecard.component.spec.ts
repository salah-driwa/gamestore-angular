import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilargamecardComponent } from './similargamecard.component';

describe('SimilargamecardComponent', () => {
  let component: SimilargamecardComponent;
  let fixture: ComponentFixture<SimilargamecardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimilargamecardComponent]
    });
    fixture = TestBed.createComponent(SimilargamecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
