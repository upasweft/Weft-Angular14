import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedLinkComponent } from './unauthorized-link.component';

describe('UnauthorizedLinkComponent', () => {
  let component: UnauthorizedLinkComponent;
  let fixture: ComponentFixture<UnauthorizedLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthorizedLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizedLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
