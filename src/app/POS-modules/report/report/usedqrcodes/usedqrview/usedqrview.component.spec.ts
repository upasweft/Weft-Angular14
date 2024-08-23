import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedqrviewComponent } from './usedqrview.component';

describe('UsedqrviewComponent', () => {
  let component: UsedqrviewComponent;
  let fixture: ComponentFixture<UsedqrviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsedqrviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedqrviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
