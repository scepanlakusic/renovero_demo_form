import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DemoFormFieldComponent } from 'src/app/components/demo-form-field/demo-form-field.component';

@Component({
  selector: 'app-drop-down-input',
  templateUrl: './drop-down-input.component.html',
  styleUrls: ['./drop-down-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DropDownInputComponent),
    },
  ],
})
export class DropDownInputComponent
  implements ControlValueAccessor, OnDestroy, AfterViewInit
{
  // Options list
  @Input() public options: string[] = [];

  // Options dropdown flag
  public showOptions: boolean = false;

  // Control value property, getter and setter
  private _controlValue: string = '';
  public get controlValue(): string {
    return this._controlValue;
  }
  public set controlValue(value: string) {
    if (this._controlValue !== value) {
      this._controlValue = value;
      if (this._propagateChange) {
        this._propagateChange(this._controlValue);
      }
    }
  }
  private _propagateChange: ((value: string) => void) | undefined;
  private _propagateTouched: (() => void) | undefined;
  private _propagateValidationChange: (() => void) | undefined;
  private _inputFocusListener: (() => void) | undefined;
  private _clickListener: (() => void) | undefined;
  private _documentFocusListener: (() => void) | undefined;

  // Input element reference
  @ViewChild('inputEl') private _input:
    | ElementRef<HTMLInputElement>
    | undefined;

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _elRef: ElementRef,
    private _renderer: Renderer2,
    private _ngZone: NgZone,
    // Parent form field
    @Optional() private _formField: DemoFormFieldComponent
  ) {
    // Run listeners outside ngZone to prevent unnecessary change detection cycles
    this._ngZone.runOutsideAngular(() => {
      this._clickListener = this._renderer.listen(
        document,
        'click',
        (event: MouseEvent) => {
          this._updateFocusInsideZone(event.target as HTMLElement);
        }
      );
      this._documentFocusListener = this._renderer.listen(
        document,
        'focusin',
        () => {
          this._updateFocusInsideZone(document.activeElement as HTMLElement);
        }
      );
    });
  }

  public ngAfterViewInit(): void {
    if (this._input) {
      this._inputFocusListener = this._renderer.listen(
        this._input?.nativeElement,
        'focus',
        () => {
          // When input is focused, close the options dropdown
          this.closeOptions();
          this._changeDetector.markForCheck();
        }
      );
    }
  }

  public ngOnDestroy(): void {
    if (this._inputFocusListener) {
      this._inputFocusListener();
    }
    if (this._clickListener) {
      this._clickListener();
    }
    if (this._documentFocusListener) {
      this._documentFocusListener();
    }
  }

  public selectOption(value: string): void {
    this.controlValue = value;
    this.showOptions = false;
    setTimeout(() => {
      this._input?.nativeElement.focus();
    }, 0);
  }

  public toogleOptions(): void {
    this.showOptions = !this.showOptions;
  }

  public closeOptions(): void {
    if (this.showOptions) {
      this.showOptions = false;
    }
  }

  /**
   * If dropdown input component focus is changed, run focus or blur functions inside ngZone
   * @param element html element
   */
  private _updateFocusInsideZone(element: HTMLElement): void {
    if (!this._elRef.nativeElement.contains(element)) {
      if (this._formField.isFocused) {
        this._ngZone.run(() => {
          this._controlBlured();
        });
      }
    } else {
      if (!this._formField.isFocused) {
        this._ngZone.run(() => {
          this._controlFocused();
        });
      }
    }
  }

  /**
   * If control is focused, update form filed state
   */
  private _controlFocused(): void {
    this._formField.__isFocused = true;
    if (this._propagateTouched) {
      this._formField.__isTouched = true;
      this._propagateTouched();
    }
    this._changeDetector.markForCheck();
  }

  /**
   * If control is blured, update form field state
   */
  private _controlBlured(): void {
    this._input?.nativeElement.blur();
    this._formField.__isFocused = false;
    this.closeOptions();
    if (this._propagateValidationChange) {
      this._propagateValidationChange();
    }
    this._changeDetector.markForCheck();
  }

  // ====================
  // ControlValueAccessor
  // ====================

  public writeValue(value: string): void {
    if (this._controlValue !== value) {
      this._controlValue = value;
      this._changeDetector.markForCheck();
    }
  }

  public registerOnChange(callback: (value: string) => void): void {
    this._propagateChange = callback;
  }

  public registerOnTouched(callback: () => void): void {
    this._propagateTouched = callback;
  }

  public registerOnValidatorChange?(callback: () => void): void {
    this._propagateValidationChange = callback;
  }
}
