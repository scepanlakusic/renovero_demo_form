import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFormErrorComponent } from './demo-form-error.component';

describe('DemoFormErrorComponent', () => {
  let component: DemoFormErrorComponent;
  let fixture: ComponentFixture<DemoFormErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoFormErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoFormErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
