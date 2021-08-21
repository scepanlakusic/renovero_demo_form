/**
 * Interfaces based on given task
 */

export interface IApiResponseWorkTypes {
  workTypeUids: string[];
}

export interface IApiResponsePlace {
  id: number;
  postalCode: number;
  placeName: string;
  cantonName: string;
  country: string;
}

export interface IApiResponseTask {
  workTypes: IApiResponseWorkTypes;
  title: string;
  place: IApiResponsePlace;
  taskUid: string;
}

export interface IApiResponseModel {
  accountUid: string;
  newAccount: boolean;
  task: IApiResponseTask;
}
