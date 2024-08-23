import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserguidanceManagementComponent } from './userguidance-management.component';

describe('UserguidanceManagementComponent', () => {
  let component: UserguidanceManagementComponent;
  let fixture: ComponentFixture<UserguidanceManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserguidanceManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserguidanceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
