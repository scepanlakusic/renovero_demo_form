import { Directive, DoCheck, OnDestroy, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DemoFormFieldComponent } from '../components/demo-form-field/demo-form-field.component';
import { FormFieldErrors } from '../types/form-field-errors.type';

/**
 * Since we have no way to detect the formGroup markAllAsTouched event within the custom controlValueAccessor,
 * we need the original ngControl
 */
@Directive({
  selector: '[appCustomControl]',
})
export class CustomControlDirective implements OnInit, DoCheck, OnDestroy {
  public get isTouched(): boolean {
    return !!this._ngControl?.touched;
  }

  public get errors(): FormFieldErrors {
    return !this._ngControl?.errors ? {} : this._ngControl.errors;
  }
  private _statusSubscription: Subscription = new Subscription();

  constructor(
    // Original ngControl
    @Optional() private _ngControl: NgControl,
    @Optional() private _formField: DemoFormFieldComponent
  ) {}

  public ngOnInit(): void {
    if (this._ngControl && this._formField) {
      this._formField.__isInvalid = this._ngControl.status === 'INVALID';
      this._statusSubscription.add(
        this._ngControl.statusChanges?.subscribe(() => {
          this._formField.__isInvalid = this._ngControl.status === 'INVALID';
        })
      );
    }
  }

  public ngDoCheck(): void {
    // Since we don't have an observable for the touched state on the form control,
    // we need to do a check on every change detection cycle
    this._setFormFieldState();
  }

  public ngOnDestroy(): void {
    this._statusSubscription.unsubscribe();
  }

  private _setFormFieldState(): void {
    if (this._ngControl && this._formField) {
      this._formField.__isTouched = !!this._ngControl.touched;
      this._formField.__errors = !this._ngControl.errors
        ? {}
        : this._ngControl.errors;
    }
  }
}
