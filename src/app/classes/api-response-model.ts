import {
  IApiResponseModel,
  IApiResponsePlace,
  IApiResponseTask,
} from '../interfaces/api-response.interface';

class ApiResponseWorkTypes {
  public workTypeUids: string[];

  constructor(apiWorkTypeUids: string[]) {
    this.workTypeUids = apiWorkTypeUids;
  }
}

class ApiResponsePlace {
  public id: number;
  public postalCode: number;
  public placeName: string;
  public cantonName: string;
  public country: string;

  constructor(apiPlace: IApiResponsePlace) {
    this.id = apiPlace.id;
    this.postalCode = apiPlace.postalCode;
    this.placeName = apiPlace.placeName;
    this.cantonName = apiPlace.cantonName;
    this.country = apiPlace.country;
  }
}

class ApiResponseTask {
  public workTypes: ApiResponseWorkTypes;
  public title: string;
  public place: ApiResponsePlace;
  public taskUid: string;

  constructor(apiTask: IApiResponseTask) {
    this.workTypes = new ApiResponseWorkTypes(apiTask.workTypes.workTypeUids);
    this.title = apiTask.title;
    this.place = new ApiResponsePlace(apiTask.place);
    this.taskUid = apiTask.taskUid;
  }
}

export class ApiResponseModel {
  public accountUid: string;
  public newAccount: boolean;
  public task: ApiResponseTask;

  constructor(responseModel: IApiResponseModel) {
    this.accountUid = responseModel.accountUid;
    this.newAccount = responseModel.newAccount;
    this.task = new ApiResponseTask(responseModel.task);
  }
}
