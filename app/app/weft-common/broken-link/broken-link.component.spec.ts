import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokenLinkComponent } from './broken-link.component';

describe('BrokenLinkComponent', () => {
  let component: BrokenLinkComponent;
  let fixture: ComponentFixture<BrokenLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokenLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokenLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
