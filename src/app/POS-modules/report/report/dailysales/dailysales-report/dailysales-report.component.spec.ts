import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailysalesReportComponent } from './dailysales-report.component';

describe('DailysalesReportComponent', () => {
  let component: DailysalesReportComponent;
  let fixture: ComponentFixture<DailysalesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailysalesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailysalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
