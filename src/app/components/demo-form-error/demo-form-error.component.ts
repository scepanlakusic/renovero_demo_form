import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { FormFieldErrors } from 'src/app/types/form-field-errors.type';
import { DemoFormFieldComponent } from '../demo-form-field/demo-form-field.component';

const FORM_ERROR_SHOW_CLASS = 'form-field__error--show';

@Component({
  selector: 'app-demo-form-error',
  templateUrl: './demo-form-error.component.html',
  styleUrls: ['./demo-form-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoFormErrorComponent implements OnInit, OnDestroy {
  @Input() public errorKey: string = '';
  private _errorsSubscription: Subscription = new Subscription();

  constructor(
    private _renderer: Renderer2,
    private _elRef: ElementRef<HTMLElement>,
    @Optional() private _formField: DemoFormFieldComponent
  ) {}

  public ngOnInit(): void {
    if (this._formField && !!this.errorKey) {
      this._errorsSubscription.add(
        // Update the component error class
        this._formField.errors$
          .pipe(skipWhile(() => !this._formField.isTouched))
          .subscribe((errors: FormFieldErrors) => {
            if (errors[this.errorKey]) {
              this._renderer.addClass(
                this._elRef.nativeElement,
                FORM_ERROR_SHOW_CLASS
              );
            } else {
              this._renderer.removeClass(
                this._elRef.nativeElement,
                FORM_ERROR_SHOW_CLASS
              );
            }
          })
      );
    }
  }

  public ngOnDestroy(): void {
    this._errorsSubscription.unsubscribe();
  }
}
