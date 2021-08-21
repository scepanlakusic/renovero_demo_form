import {
  Directive,
  DoCheck,
  ElementRef,
  Host,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DemoFormFieldComponent } from '../components/demo-form-field/demo-form-field.component';

@Directive({
  selector: '[appDemoFormControl]',
})
export class DemoFormControlDirective implements OnInit, DoCheck, OnDestroy {
  private _focusListener: (() => void) | undefined;
  private _blurListener: (() => void) | undefined;
  private _statusSubscription: Subscription = new Subscription();

  constructor(
    private _renderer: Renderer2,
    private _element: ElementRef<HTMLInputElement>,
    @Optional() private _formField: DemoFormFieldComponent,
    @Optional() @Host() private _formControl: NgControl
  ) {}

  public ngOnInit(): void {
    if (this._formField) {
      this._focusListener = this._renderer.listen(
        this._element.nativeElement,
        'focus',
        () => {
          this._formField.__isFocused = true;
        }
      );

      this._blurListener = this._renderer.listen(
        this._element.nativeElement,
        'blur',
        () => {
          this._formField.__isFocused = false;
        }
      );
    }

    if (this._formControl && this._formField) {
      this._formField.__isInvalid = this._formControl.status === 'INVALID';
      this._statusSubscription.add(
        this._formControl.statusChanges?.subscribe(() => {
          this._formField.__isInvalid = this._formControl.status === 'INVALID';
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
    // Destroying listeners
    if (this._focusListener) {
      this._focusListener();
    }
    if (this._blurListener) {
      this._blurListener();
    }
    this._statusSubscription.unsubscribe();
  }

  private _setFormFieldState(): void {
    if (this._formControl && this._formField) {
      this._formField.__isTouched = !!this._formControl.touched;
      this._formField.__errors = !this._formControl.errors
        ? {}
        : this._formControl.errors;
    }
  }
}
