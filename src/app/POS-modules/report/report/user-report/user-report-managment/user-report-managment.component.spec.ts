import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportManagmentComponent } from './user-report-managment.component';

describe('UserReportManagmentComponent', () => {
  let component: UserReportManagmentComponent;
  let fixture: ComponentFixture<UserReportManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReportManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReportManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
