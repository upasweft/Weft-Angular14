import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatReportMangementComponent } from './vat-report-mangement.component';

describe('VatReportMangementComponent', () => {
  let component: VatReportMangementComponent;
  let fixture: ComponentFixture<VatReportMangementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatReportMangementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatReportMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
