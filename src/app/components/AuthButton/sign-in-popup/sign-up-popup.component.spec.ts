import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPopupComponent } from './sign-in-popup.component';

describe('SignUpPopupComponent', () => {
  let component: SignUpPopupComponent;
  let fixture: ComponentFixture<SignUpPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpPopupComponent]
    });
    fixture = TestBed.createComponent(SignUpPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
