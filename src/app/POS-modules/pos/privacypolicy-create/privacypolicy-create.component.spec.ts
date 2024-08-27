import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacypolicyCreateComponent } from './privacypolicy-create.component';

describe('PrivacypolicyCreateComponent', () => {
  let component: PrivacypolicyCreateComponent;
  let fixture: ComponentFixture<PrivacypolicyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacypolicyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacypolicyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
