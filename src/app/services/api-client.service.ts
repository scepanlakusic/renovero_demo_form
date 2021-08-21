import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiFormModel } from '../classes/api-form-model';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';
import { EMessage } from '../enums/message.enum';
import { IApiResponseModel } from '../interfaces/api-response.interface';
import { map } from 'rxjs/operators';
import { ApiResponseModel } from '../classes/api-response-model';

/**
 * Dummy http client for task submitting
 */
@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor(
    private _http: HttpClient,
    private _messageService: MessageService
  ) {}

  /**
   * Post created model to api and show message
   * @param apiModel model for post method
   */
  public submitTask(apiModel: ApiFormModel): void {
    this._http
      .post<IApiResponseModel>(environment.submitTaskEndpoint, apiModel)
      .pipe(map((response) => new ApiResponseModel(response)))
      .subscribe(
        (apiModel: ApiResponseModel) => {
          this._messageService.add({
            text: `Succesfully created task with Uid: ${apiModel.task.taskUid}`,
            type: EMessage.SUCCESS,
          });
        },
        (err) => {
          console.log(err);
          this._messageService.add({
            text: err.statusText,
            type: EMessage.ERROR,
          });
        }
      );
  }
}
