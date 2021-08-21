class ApiFormPlace {
  public id: number = 2658937;
  public placeName: string = 'Testplace';
  public placeZip: number = 1234;
}

class ApiFormPublisher {
  public email: string;
  public phone: string = '0123456789';
  public place: ApiFormPlace = new ApiFormPlace();

  constructor(email: string) {
    this.email = email;
  }
}

export class ApiFormModel {
  public title: string;
  public description: string;
  public place: ApiFormPlace = new ApiFormPlace();
  public publisherAccountCreate: ApiFormPublisher;

  constructor(title: string, desciption: string, email: string) {
    this.title = title;
    this.description = desciption;
    this.publisherAccountCreate = new ApiFormPublisher(email);
  }
}
