import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailysalesmangementComponent } from './dailysalesmangement.component';

describe('DailysalesmangementComponent', () => {
  let component: DailysalesmangementComponent;
  let fixture: ComponentFixture<DailysalesmangementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailysalesmangementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailysalesmangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
