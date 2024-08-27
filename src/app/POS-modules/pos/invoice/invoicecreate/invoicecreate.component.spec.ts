import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicecreateComponent } from './invoicecreate.component';

describe('InvoicecreateComponent', () => {
  let component: InvoicecreateComponent;
  let fixture: ComponentFixture<InvoicecreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicecreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
