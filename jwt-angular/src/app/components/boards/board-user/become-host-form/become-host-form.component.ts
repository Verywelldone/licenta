import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../../services/token-storage.service';


@Component({
  selector: 'app-become-host-form',
  templateUrl: './become-host-form.component.html',
  styleUrls: ['./become-host-form.component.css']
})
export class BecomeHostFormComponent implements OnInit {

  selectedFile: File;
  message: string;
  public imagePath;
  imgURL: any;

  hostForm = {
    animalsAccepted: new Array(),
    acceptedDogSize: new Array(),
    placeToLive: String,
    holdsPets: Boolean,
    tcsAccepted: Boolean
  };


  constructor(private httpClient: HttpClient, private router: Router, private token: TokenStorageService) {
  }

  ngOnInit(): void {
    // this.services = new Service();
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    console.log(this.hostForm);
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
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
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
      this.message = 'Only images are supported.';
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
