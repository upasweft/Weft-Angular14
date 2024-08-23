import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockmanagementComponent } from './stockmanagement.component';

describe('StockmanagementComponent', () => {
  let component: StockmanagementComponent;
  let fixture: ComponentFixture<StockmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
