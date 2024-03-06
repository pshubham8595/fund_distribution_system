import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankHomePageComponent } from './bank-home-page.component';

describe('BankHomePageComponent', () => {
  let component: BankHomePageComponent;
  let fixture: ComponentFixture<BankHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankHomePageComponent]
    });
    fixture = TestBed.createComponent(BankHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
