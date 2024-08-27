import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersettingsManagementComponent } from './bannersettings-management.component';

describe('BannersettingsManagementComponent', () => {
  let component: BannersettingsManagementComponent;
  let fixture: ComponentFixture<BannersettingsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannersettingsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersettingsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
