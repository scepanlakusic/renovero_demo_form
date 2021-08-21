import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormFieldErrors } from 'src/app/types/form-field-errors.type';

const FORM_FIELD_CLASS = 'form-field';
const FORM_FIELD_FOCUSED_CLASS = 'form-field--focused';
const FORM_FIELD_INVALID_CLASS = 'form-field--invalid';
const FORM_FIELD_TOUCHED_CLASS = 'form-field--touched';

@Component({
  selector: 'app-demo-form-field',
  templateUrl: './demo-form-field.component.html',
  styleUrls: ['./demo-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoFormFieldComponent implements OnInit {
  @Input() public label: string = '';

  /**
   * Indicates whether the form field is focused or not
   */
  private _isFocused: boolean = false;
  /**
   * Indicates whether the form field is focused or not
   */
  public get isFocused(): boolean {
    return this._isFocused;
  }
  /**
   * [Internal Value - DO NOT USE]: Used by child controls to set the focused state
   */
  public set __isFocused(isFocused: boolean) {
    const oldValue = this._isFocused;
    this._isFocused = isFocused;

    if (oldValue != isFocused) {
      this._updateStateClasses();
    }
  }

  /**
   * Indicates whether the current value/state of the field is invalid
   */
  private _isInvalid: boolean = false;
  /**
   * Indicates whether the current value/state of the field is invalid
   */
  public get isInvalid(): boolean {
    return this._isInvalid;
  }
  /**
   * [Internal Value - DO NOT USE] Used by child controls to set the invalid state
   */
  public set __isInvalid(isInvalid: boolean) {
    const oldValue = this._isInvalid;
    this._isInvalid = isInvalid;

    if (oldValue != this._isInvalid) {
      this._updateStateClasses();
    }
  }

  /**
   * Indicates whether the field has been touched by the user or not
   */
  private _isTouched: boolean = false;
  /**
   * Indicates whether the field has been touched by the user or not
   */
  public get isTouched(): boolean {
    return this._isTouched;
  }
  /**
   * [Internal Value - DO NOT USE] Used by child controls to set the focused state
   */
  public set __isTouched(isTouched: boolean) {
    const oldValue = this._isTouched;
    this._isTouched = isTouched;

    if (oldValue != this.isTouched) {
      this._updateStateClasses();
      this._changeDetector.markForCheck();
    }
  }

  /**
   * Behavior subject for the errors value
   */
  private _errors$: BehaviorSubject<FormFieldErrors> = new BehaviorSubject({});
  /**
   * Behavior subject for the errors value
   */
  public get errors$(): Observable<FormFieldErrors> {
    return this._errors$.asObservable();
  }
  /**
   * Errors present in this form field
   */
  public get errors(): FormFieldErrors {
    return this._errors$.getValue();
  }
  /**
   * [Internal Value - DO NOT USE] Used by child controls to set the list of errors
   */
  public set __errors(errors: FormFieldErrors) {
    this._errors$.next(errors);
  }

  constructor(
    private _renderer: Renderer2,
    private _elRef: ElementRef,
    private _changeDetector: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this._renderer.addClass(this._elRef.nativeElement, FORM_FIELD_CLASS);
  }

  /**
   * Update the element classes based on current field state
   */
  private _updateStateClasses(): void {
    this._updateFocusState();
    this._updateTouchedState();
    this._updateInvalidState();
  }

  /**
   * Update the element focus class
   */
  private _updateFocusState(): void {
    if (this._isFocused) {
      this._renderer.addClass(
        this._elRef.nativeElement,
        FORM_FIELD_FOCUSED_CLASS
      );
    } else {
      this._renderer.removeClass(
        this._elRef.nativeElement,
        FORM_FIELD_FOCUSED_CLASS
      );
    }
  }
  /**
   * Update the element invalid class
   */
  private _updateInvalidState(): void {
    // Show the invalid state only if the control is touched
    if (this._isInvalid && this._isTouched) {
      this._renderer.addClass(
        this._elRef.nativeElement,
        FORM_FIELD_INVALID_CLASS
      );
    } else {
      this._renderer.removeClass(
        this._elRef.nativeElement,
        FORM_FIELD_INVALID_CLASS
      );
    }
  }

  /**
   * Update the element touched class
   */
  private _updateTouchedState(): void {
    if (this._isTouched) {
      this._renderer.addClass(
        this._elRef.nativeElement,
        FORM_FIELD_TOUCHED_CLASS
      );
    } else {
      this._renderer.removeClass(
        this._elRef.nativeElement,
        FORM_FIELD_TOUCHED_CLASS
      );
    }
  }
}
