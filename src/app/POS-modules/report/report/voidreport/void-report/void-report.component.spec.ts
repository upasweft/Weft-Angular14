import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoidReportComponent } from './void-report.component';

describe('VoidReportComponent', () => {
  let component: VoidReportComponent;
  let fixture: ComponentFixture<VoidReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoidReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoidReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
