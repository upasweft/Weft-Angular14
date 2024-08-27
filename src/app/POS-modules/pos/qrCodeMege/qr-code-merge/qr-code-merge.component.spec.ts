import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeMergeComponent } from './qr-code-merge.component';

describe('QrCodeMergeComponent', () => {
  let component: QrCodeMergeComponent;
  let fixture: ComponentFixture<QrCodeMergeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrCodeMergeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
