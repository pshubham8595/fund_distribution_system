import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictHomePageComponent } from './district-home-page.component';

describe('DistrictHomePageComponent', () => {
  let component: DistrictHomePageComponent;
  let fixture: ComponentFixture<DistrictHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistrictHomePageComponent]
    });
    fixture = TestBed.createComponent(DistrictHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
