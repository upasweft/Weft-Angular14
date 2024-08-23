import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlysummaryManagementComponent } from './monthlysummary-management.component';

describe('MonthlysummaryManagementComponent', () => {
  let component: MonthlysummaryManagementComponent;
  let fixture: ComponentFixture<MonthlysummaryManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlysummaryManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlysummaryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
