import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupacessComponent } from './groupacess.component';

describe('GroupacessComponent', () => {
  let component: GroupacessComponent;
  let fixture: ComponentFixture<GroupacessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupacessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupacessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
