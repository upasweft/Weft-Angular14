import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AminusercreateComponent } from './aminusercreate.component';

describe('AminusercreateComponent', () => {
  let component: AminusercreateComponent;
  let fixture: ComponentFixture<AminusercreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AminusercreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AminusercreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
