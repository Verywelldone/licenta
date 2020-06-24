import {Component, OnInit} from '@angular/core';
import {ServiceExample} from '../../become-sitter-form/become-sitter-form.component';
import {SitterProfileService} from '../../../../../../services/sitter-service/sitter-profile.service';
import {TokenStorageService} from '../../../../../../services/token-storage.service';

@Component({
  selector: 'app-update-sitter-profile',
  templateUrl: './update-sitter-profile.component.html',
  styleUrls: ['./update-sitter-profile.component.css']
})
export class UpdateSitterProfileComponent implements OnInit {

  // Anymal type variables
  public animalType: any[] = [];
  public dogSizeArray: any[] = [];
  public passStepOne = false;

  // Service type variables
  public serviceArray: ServiceExample[] = [];

  // place to live
  public placeToLive = '';

  // other pets
  public otherPets = '';

  constructor(private sitterProfileService: SitterProfileService, private token: TokenStorageService) {
  }

  ngOnInit() {
  }


  selectAnymalType(event: any) {
    if (event.source.checked) {
      this.animalType.push(event.source.value);
    } else {
      const index: number = this.animalType.indexOf(event.source.value);
      this.animalType.splice(index, 1);

      if (event.source.value === 'Dogs') {
        this.dogSizeArray.splice(0, this.dogSizeArray.length);
      }
      this.serviceArray.length = 0;
    }
    this.checkIfPassStepOne();
  }

  selectDogSize(event: any) {
    if (event.source.checked) {
      this.dogSizeArray.push(event.source.value);
    } else {
      const index: number = this.dogSizeArray.indexOf(event.source.value);
      this.dogSizeArray.splice(index, 1);
    }
    this.checkIfPassStepOne();
  }

  // SERVICE TYPE SECTION
  selectService(service, price) {
    if (this.serviceArray.find((sp) => sp.name === service)) {
      this.serviceArray.find(sp => sp.name === service).price = price;
    } else {
      const selectedService = new ServiceExample();
      selectedService.name = service;
      selectedService.price = price;
      this.serviceArray.push(selectedService);
    }

    console.log(this.serviceArray);

  }

  deselectService(event: any) {
    if (!event.source.checked) {
      const index = this.serviceArray.indexOf(event.source.value);
      this.serviceArray.splice(index, 1);
    } else {
      const selectedService = new ServiceExample();
      selectedService.name = event.source.value;
      selectedService.price = 10;
      console.log(selectedService);
      this.serviceArray.push(selectedService);
    }
  }

  handlePlaceToLive(event: any) {
    this.placeToLive = event.source.value;
    console.log(this.placeToLive);
  }

  handleOtherPetsRadio(event: any) {
    this.otherPets = event.source.value;
    console.log(this.otherPets);
  }


  checkIfPassStepOne() {
    // include cats but not dogs
    if (this.animalType.includes('Cats') && !this.animalType.includes('Dogs')) {
      this.passStepOne = true;
      //  include cats and dogs and at least one dog size is selected
    } else if (this.animalType.includes('Cats') && this.animalType.includes('Dogs') && this.dogSizeArray.length !== 0) {
      this.passStepOne = true;
      //  Only dogs are included and at least one dog size is selected
    } else if (!this.animalType.includes('Cats') && this.animalType.includes('Dogs') && this.dogSizeArray.length !== 0) {
      this.passStepOne = true;
      //  Dog selected but no dog size
    } else if (this.animalType.includes('Dogs') && this.dogSizeArray.length === 0) {
      this.passStepOne = false;
      //  nothing selected
    } else if (this.dogSizeArray.length === 0 || this.animalType.length === 0) {
      this.passStepOne = false;
      //  any other case
    } else {
      this.passStepOne = false;
    }
  }

  checkIfIsFormReady() {
    if (this.passStepOne && this.serviceArray.length !== 0 && this.placeToLive !== '' && this.otherPets !== '') {
      return true;
    } else {
      return false;
    }
  }

  submitSitterUpdate() {
    const data = {
      userId: this.token.getUser().id,
      animalType: this.animalType,
      dogSizeArray: this.dogSizeArray,
      serviceArray: this.serviceArray,
      placeToLive: this.placeToLive,
      otherPets: this.otherPets
    };

    const json = JSON.stringify(data);

    this.sitterProfileService.updateSitterProfile(this.token.getUser().id, json).subscribe(
      response =>{
        console.log(response)
      }
    );
  }
}
