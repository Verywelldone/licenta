import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-become-host-form',
  templateUrl: './become-host-form.component.html',
  styleUrls: ['./become-host-form.component.css']
})
export class BecomeHostFormComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  //preview
  public imagePath;
  imgURL: any;

  ngOnInit(): void {
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    console.log(this.selectedFile);

    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, {observe: 'response'})
      .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        }
      );

    this.router.navigate(['/home']);
  }

  // getImage() {
  //   this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
  //     .subscribe(
  //       res => {
  //         this.retrieveResonse = res;
  //         this.base64Data = this.retrieveResonse.picByte;
  //         this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  //       }
  //     );
  // }

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
