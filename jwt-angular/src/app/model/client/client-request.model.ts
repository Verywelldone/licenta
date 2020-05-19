import {ClientRequestServiceModel} from './client-request-service.model';

export class ClientRequestModel {
  startDate: string;
  endDate: string;
  fromClient: number;
  toSitter: number;
  services: ClientRequestServiceModel[];

}
