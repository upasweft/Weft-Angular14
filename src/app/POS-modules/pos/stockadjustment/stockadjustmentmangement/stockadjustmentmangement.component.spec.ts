import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockadjustmentmangementComponent } from './stockadjustmentmangement.component';

describe('StockadjustmentmangementComponent', () => {
  let component: StockadjustmentmangementComponent;
  let fixture: ComponentFixture<StockadjustmentmangementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockadjustmentmangementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockadjustmentmangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
