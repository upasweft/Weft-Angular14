import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodemanagementComponent } from './qrcodemanagement.component';

describe('QrcodemanagementComponent', () => {
  let component: QrcodemanagementComponent;
  let fixture: ComponentFixture<QrcodemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
