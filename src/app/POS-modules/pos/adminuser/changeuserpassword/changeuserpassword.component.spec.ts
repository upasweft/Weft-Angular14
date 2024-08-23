import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeuserpasswordComponent } from './changeuserpassword.component';

describe('ChangeuserpasswordComponent', () => {
  let component: ChangeuserpasswordComponent;
  let fixture: ComponentFixture<ChangeuserpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeuserpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeuserpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
