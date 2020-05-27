import {sitterResponseServiceModel} from './client-request-service.model';

export class SitterResponseModel {
  startDate: Date;
  endDate: Date;
  fromClient: number;
  toSitter: number;
  services: sitterResponseServiceModel[];

}
