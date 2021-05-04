import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangAlertComponent } from './lang-alert.component';

describe('LangAlertComponent', () => {
  let component: LangAlertComponent;
  let fixture: ComponentFixture<LangAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LangAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
