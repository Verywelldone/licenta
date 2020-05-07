import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../../services/token-storage.service';
import {FormControl, FormGroup} from '@angular/forms';
import {requireCheckboxesToBeCheckedValidator} from '../../../../helpers/require-checkboxes-to-be-checked.validator';


@Component({
  selector: 'app-become-host-form',
  templateUrl: './become-host-form.component.html',
  styleUrls: ['./become-host-form.component.css']
})
export class BecomeHostFormComponent implements OnInit {

  selectedFile: File;

  public imagePath;
  imgURL: any;

  hostForm = {
    animalsAccepted: new Array(),
    acceptedDogSize: new Array(),
    placeToLive: String,
    holdsPets: Boolean,
    tcsAccepted: Boolean
  };

  isDogSizeFormValid;
  dogSizemessage: string;

  isHostServiceGroupValid;
  serviceGroupMessage: string;

  hostFormValidator = new FormGroup({
    dogSizeGroup: new FormGroup({
      small: new FormControl(false),
      medium: new FormControl(false),
      large: new FormControl(false),
      giant: new FormControl(false)
    }, requireCheckboxesToBeCheckedValidator()),

    hostServiceGroup: new FormGroup({
      boarding: new FormControl(false),
      houseSitting: new FormControl(false),
      dropInVisits: new FormControl(false),
      dogWalking: new FormControl(false),
      doggyDayCare: new FormControl(false)
    }, requireCheckboxesToBeCheckedValidator())
  });


  constructor(private httpClient: HttpClient, private router: Router, private token: TokenStorageService) {
  }

  ngOnInit(): void {
    // this.services = new Service();
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {

    this.isDogSizeFormValid = this.hostFormValidator.get('dogSizeGroup').status;
    this.isHostServiceGroupValid = this.hostFormValidator.get('hostServiceGroup').status;

    console.log(this.isDogSizeFormValid + ' dogSizeForm ');
    console.log(this.isHostServiceGroupValid + ' isHostServiceGroupValid ');

    if (this.isDogSizeFormValid === 'INVALID') {
      this.dogSizemessage = ' Select at least one checkbox!';
      this.isDogSizeFormValid = false;
    }

    if (this.isHostServiceGroupValid === 'INVALID') {
      this.serviceGroupMessage = 'Select at least one service';
      this.isHostServiceGroupValid = false;
    }


  }


  handleAnimalAcceptance(animal) {
    if (this.hostForm.animalsAccepted.includes(animal)) {
      const index: number = this.hostForm.animalsAccepted.indexOf(animal);
      this.hostForm.animalsAccepted.splice(index, 1);
    } else {
      this.hostForm.animalsAccepted.push(animal);
    }
  }

  handleDogSize(dogSize) {
    if (this.hostForm.acceptedDogSize.includes(dogSize)) {
      const index: number = this.hostForm.acceptedDogSize.indexOf(dogSize);
      this.hostForm.acceptedDogSize.splice(index, 1);
    } else {
      this.hostForm.acceptedDogSize.push(dogSize);
    }
  }


  onUpload() {
    // console.log(this.selectedFile);
    const userID = this.token.getUser().id;
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    uploadImageData.append('userId', userID);


    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, {observe: 'response'})
      .subscribe((response) => {
          if (response.status === 200) {
            // this.message = 'Image uploaded successfully';
          } else {
            // this.message = 'Image not uploaded successfully';
          }
        }
      );

    // this.router.navigate(['/home']);
  }


  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

}
