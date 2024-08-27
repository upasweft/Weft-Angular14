import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersettingsCreateComponent } from './bannersettings-create.component';

describe('BannersettingsCreateComponent', () => {
  let component: BannersettingsCreateComponent;
  let fixture: ComponentFixture<BannersettingsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannersettingsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersettingsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
