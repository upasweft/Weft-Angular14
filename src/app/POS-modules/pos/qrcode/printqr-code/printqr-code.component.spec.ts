import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintqrCodeComponent } from './printqr-code.component';

describe('PrintqrCodeComponent', () => {
  let component: PrintqrCodeComponent;
  let fixture: ComponentFixture<PrintqrCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintqrCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintqrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
