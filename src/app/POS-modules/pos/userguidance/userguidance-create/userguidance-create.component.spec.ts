import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserguidanceCreateComponent } from './userguidance-create.component';

describe('UserguidanceCreateComponent', () => {
  let component: UserguidanceCreateComponent;
  let fixture: ComponentFixture<UserguidanceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserguidanceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserguidanceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
