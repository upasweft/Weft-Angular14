import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceitemsComponent } from './invoiceitems.component';

describe('InvoiceitemsComponent', () => {
  let component: InvoiceitemsComponent;
  let fixture: ComponentFixture<InvoiceitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
