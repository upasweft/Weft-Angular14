import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridManagementComponent } from './grid-management.component';

describe('GridManagementComponent', () => {
  let component: GridManagementComponent;
  let fixture: ComponentFixture<GridManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
