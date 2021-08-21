import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiFormModel } from 'src/app/classes/api-form-model';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoFormComponent {
  public demoForm: FormGroup;
  /**
   * Dummy job options
   */
  public jobOptions: string[] = [
    'Malerarbeiten',
    'Öl wechsel machen',
    'Betonarbeiten',
    'Gartenmauer bauen',
  ];

  constructor(private _apiService: ApiClientService) {
    this.demoForm = new FormGroup({
      // The title is a custom control. This control contains only the required validator
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  public onFormSubmit(): void {
    if (this.demoForm.invalid) {
      this.demoForm.markAllAsTouched();
    } else {
      const formValues = this.demoForm.getRawValue();
      const apiModel = new ApiFormModel(
        formValues.title,
        formValues.description,
        formValues.email
      );
      this._apiService.submitTask(apiModel);
    }
  }
}
