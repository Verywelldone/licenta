import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../services/token-storage.service';
import {HttpClient} from '@angular/common/http';
import {UserRatingService} from '../../../services/rating/user-rating.service';
import {UserRatingModel} from '../../../model/user/user-rating.model';
import {Router} from '@angular/router';
import {SitterProfileService} from '../../../services/sitter-service/sitter-profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  // USER RATING
  userRatings: UserRatingModel[];
  currentRate: number;


  // IMAGE VARIABLES
  selectedFile: File;
  message: string;
  public imagePath;
  imgURL: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  //SITTER DATA
  sitterServices;

  areAnyReviews = false;
  noReviews = true;

  isSitter = false;
  isNotSitter = true;

  constructor(
    private token: TokenStorageService,
    private http: HttpClient,
    private router: Router,
    private sitterProfileService: SitterProfileService,
    private userRatingService: UserRatingService
  ) {
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.getUserRatings();
    this.getImage();
    this.getSitterServices();
  }


  getImage() {
    console.log(this.token.getUser().id);
    this.http.get('http://localhost:8080/image/get/' + this.token.getUser().id)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }, error => {
          console.log(error.error);
        }
      );
  }


  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    // this.onUpload();
  }

  onUpload() {
    // console.log(this.selectedFile);
    const userID = this.token.getUser().id;
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    uploadImageData.append('userId', userID);
    this.http.post('http://localhost:8080/image/upload', uploadImageData, {observe: 'response'})
      .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        }
      );
    window.location.reload();
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
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  getSitterServices() {
    this.sitterProfileService.getSitterData(this.token.getUser().id).subscribe(response => {
      // console.log(response.serviceModelSet);
      if (response == null) {
        this.sitterServices = null;
      } else {
        this.isSitter = true;
        this.isNotSitter = false;
        this.sitterServices = response.serviceModelSet;
      }
    }, error => {
      console.log(this.sitterServices);
    });
  }

  getUserRatings() {
    const userId = this.token.getUser().id;

    this.userRatingService.getAllUserRatings(userId).subscribe(response => {

        if (response == null) {
          this.userRatings = null;
          console.log(this.areAnyReviews + ' Are any reviews');
        } else {
          this.userRatings = response;
          let sum = 0;
          this.areAnyReviews = true;
          this.noReviews = false;
          response.forEach(function(rating) {
            console.log(rating.stars);
            sum += rating.stars;
          });
          // console.log(sum / response.length);
          this.currentRate = sum / response.length;
        }
        console.log(this.userRatings);
      },
      error => {
        console.log(' INTRA FUCKING AICI');
        console.log(error.error);
      });
  }

  changeImage() {

  }

  getReviewUserImg(res) {

    let retrieveResonse = res;
    let base64Data = retrieveResonse.picByte;
    let img = 'data:image/jpeg;base64,' + base64Data;
    return img;
  }
}
