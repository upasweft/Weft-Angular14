import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReportManagementComponent } from './product-report-management.component';

describe('ProductReportManagementComponent', () => {
  let component: ProductReportManagementComponent;
  let fixture: ComponentFixture<ProductReportManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReportManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReportManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
