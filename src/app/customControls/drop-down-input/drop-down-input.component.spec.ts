import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownInputComponent } from './drop-down-input.component';

describe('DropDownInputComponent', () => {
  let component: DropDownInputComponent;
  let fixture: ComponentFixture<DropDownInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
