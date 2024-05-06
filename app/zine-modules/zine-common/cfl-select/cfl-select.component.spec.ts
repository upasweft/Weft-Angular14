import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CflSelectComponent } from './cfl-select.component';

describe('CflSelectComponent', () => {
  let component: CflSelectComponent;
  let fixture: ComponentFixture<CflSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CflSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CflSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
