import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategorymanagementComponent } from './subcategorymanagement.component';

describe('SubcategorymanagementComponent', () => {
  let component: SubcategorymanagementComponent;
  let fixture: ComponentFixture<SubcategorymanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategorymanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategorymanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
