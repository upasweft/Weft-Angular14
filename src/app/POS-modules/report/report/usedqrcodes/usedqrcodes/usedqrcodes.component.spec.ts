import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedqrcodesComponent } from './usedqrcodes.component';

describe('UsedqrcodesComponent', () => {
  let component: UsedqrcodesComponent;
  let fixture: ComponentFixture<UsedqrcodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsedqrcodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedqrcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
