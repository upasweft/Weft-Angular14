import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesettingsmangementComponent } from './sitesettingsmangement.component';

describe('SitesettingsmangementComponent', () => {
  let component: SitesettingsmangementComponent;
  let fixture: ComponentFixture<SitesettingsmangementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitesettingsmangementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesettingsmangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
