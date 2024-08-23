import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundImageManagementComponent } from './background-image-management.component';

describe('BackgroundImageManagementComponent', () => {
  let component: BackgroundImageManagementComponent;
  let fixture: ComponentFixture<BackgroundImageManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundImageManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundImageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
