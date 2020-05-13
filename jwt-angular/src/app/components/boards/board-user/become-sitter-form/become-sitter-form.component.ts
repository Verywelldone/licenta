import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../../services/token-storage.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {requireCheckboxesToBeCheckedValidator} from '../../../../helpers/require-checkboxes-to-be-checked.validator';
import {BecomeHostComponent} from '../become-host/become-host.component';
import {BecomeHostService} from '../../../../services/become-host.service';


// tslint:disable-next-line:class-name
export class ServiceExample {
  name: string;
  price: number;
}

@Component({
  selector: 'app-become-host-form',
  templateUrl: './become-sitter-form.component.html',
  styleUrls: ['./become-sitter-form.component.css']
})
export class BecomeSitterFormComponent implements OnInit {

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

  constructor(private becomeHostService: BecomeHostService, private token: TokenStorageService) {
  }

  ngOnInit(): void {
    console.log(this.passStepOne);
  }

  // ANIMAL TYPE SECTION

  selectAnymalType(event: any) {
    if (event.source.checked) {
      this.animalType.push(event.source.value);
    } else {
      const index: number = this.animalType.indexOf(event.source.value);
      this.animalType.splice(index, 1);
    }

    if (this.animalType.includes('Cats') && !this.animalType.includes('Dogs')) {
      this.passStepOne = true;
    } else {
      this.passStepOne = false;
    }

  }

  selectDogSize(event: any) {
    if (event.source.checked) {
      this.dogSizeArray.push(event.source.value);
    } else {
      const index: number = this.dogSizeArray.indexOf(event.source.value);
      this.dogSizeArray.splice(index, 1);
    }
    if (this.animalType.includes('Dogs') && this.dogSizeArray.length > 0) {
      this.passStepOne = true;
    } else {
      this.passStepOne = false;
    }
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
    console.log(this.serviceArray);
  }

  handlePlaceToLive(event: any) {
    this.placeToLive = event.source.value;
    console.log(this.placeToLive);
  }

  handleOtherPetsRadio(event: any) {
    this.otherPets = event.source.value;
    console.log(this.otherPets);
  }

  dataWrapper() {
    const data = {
      userId: this.token.getUser().id,
      animalType: this.animalType,
      dogSizeArray: this.dogSizeArray,
      serviceArray: this.serviceArray,
      placeToLive: this.placeToLive,
      otherPets: this.otherPets
    };

    const json = JSON.stringify(data);




    this.becomeHostService.submitSitterRequest(json);
    // console.log(json);
  }

  // selectedFile: File;
  // public imagePath;
  // imgURL: any;


  // onUpload() {
  //   // console.log(this.selectedFile);
  //   const userID = this.token.getUser().id;
  //   const uploadImageData = new FormData();
  //   uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  //   uploadImageData.append('userId', userID);
  //
  //
  //   this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, {observe: 'response'})
  //     .subscribe((response) => {
  //         if (response.status === 200) {
  //           // this.message = 'Image uploaded successfully';
  //         } else {
  //           // this.message = 'Image not uploaded successfully';
  //         }
  //       }
  //     );
  //
  //   // this.router.navigate(['/home']);
  // }
  //
  //
  // preview(files) {
  //   if (files.length === 0) {
  //     return;
  //   }
  //
  //   const mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     // this.message = 'Only images are supported.';
  //     return;
  //   }
  //
  //   const reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]);
  //   // tslint:disable-next-line:variable-name
  //   reader.onload = (_event) => {
  //     this.imgURL = reader.result;
  //   };
  // }


}
