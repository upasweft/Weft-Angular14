import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoidreportMangementComponent } from './voidreport-mangement.component';

describe('VoidreportMangementComponent', () => {
  let component: VoidreportMangementComponent;
  let fixture: ComponentFixture<VoidreportMangementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoidreportMangementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoidreportMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
