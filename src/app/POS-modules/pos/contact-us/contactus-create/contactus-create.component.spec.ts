import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusCreateComponent } from './contactus-create.component';

describe('ContactusCreateComponent', () => {
  let component: ContactusCreateComponent;
  let fixture: ComponentFixture<ContactusCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactusCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
