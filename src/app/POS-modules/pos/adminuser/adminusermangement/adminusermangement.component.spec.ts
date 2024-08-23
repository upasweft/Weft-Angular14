import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminusermangementComponent } from './adminusermangement.component';

describe('AdminusermangementComponent', () => {
  let component: AdminusermangementComponent;
  let fixture: ComponentFixture<AdminusermangementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminusermangementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminusermangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
