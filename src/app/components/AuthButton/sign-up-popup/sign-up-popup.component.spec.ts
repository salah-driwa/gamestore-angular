import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUPPopupComponent } from './sign-up-popup.component';

describe('SignUPPopupComponent', () => {
  let component: SignUPPopupComponent;
  let fixture: ComponentFixture<SignUPPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUPPopupComponent]
    });
    fixture = TestBed.createComponent(SignUPPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
