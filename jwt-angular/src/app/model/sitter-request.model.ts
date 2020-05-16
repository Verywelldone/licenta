import {ServiceModel} from './service-model';

export class SitterRequestModel {
  animalType: string;
  dogSize: string;
  houseType: string;
  otherPets: string;
  isActive: boolean;
  serviceModelSet: ServiceModel[];
}
