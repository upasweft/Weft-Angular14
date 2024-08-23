import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedqrcodesmangementComponent } from './usedqrcodesmangement.component';

describe('UsedqrcodesmangementComponent', () => {
  let component: UsedqrcodesmangementComponent;
  let fixture: ComponentFixture<UsedqrcodesmangementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsedqrcodesmangementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedqrcodesmangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
