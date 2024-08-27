import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsandconditionsCreateComponent } from './termsandconditions-create.component';

describe('TermsandconditionsCreateComponent', () => {
  let component: TermsandconditionsCreateComponent;
  let fixture: ComponentFixture<TermsandconditionsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsandconditionsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsandconditionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
