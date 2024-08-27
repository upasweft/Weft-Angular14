import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusCreateComponent } from './aboutus-create.component';

describe('AboutusCreateComponent', () => {
  let component: AboutusCreateComponent;
  let fixture: ComponentFixture<AboutusCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutusCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
