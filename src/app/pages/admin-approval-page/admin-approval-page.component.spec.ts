import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApprovalPageComponent } from './admin-approval-page.component';

describe('AdminApprovalPageComponent', () => {
  let component: AdminApprovalPageComponent;
  let fixture: ComponentFixture<AdminApprovalPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminApprovalPageComponent]
    });
    fixture = TestBed.createComponent(AdminApprovalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
