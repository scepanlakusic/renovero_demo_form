import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFormFieldComponent } from './demo-form-field.component';

describe('DemoFormFieldComponent', () => {
  let component: DemoFormFieldComponent;
  let fixture: ComponentFixture<DemoFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoFormFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
