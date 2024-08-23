import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportManagementComponent } from './sales-report-management.component';

describe('SalesReportManagementComponent', () => {
  let component: SalesReportManagementComponent;
  let fixture: ComponentFixture<SalesReportManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReportManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReportManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
