import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatReportComponent } from './vat-report.component';

describe('VatReportComponent', () => {
  let component: VatReportComponent;
  let fixture: ComponentFixture<VatReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
