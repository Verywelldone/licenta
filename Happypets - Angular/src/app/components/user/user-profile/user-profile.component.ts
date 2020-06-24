import {Component, Input, OnInit} from '@angular/core';
import {UserProfileService} from '../../../services/profile/user-profile.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserRatingModel} from '../../../model/user/user-rating.model';
import {UserRatingService} from '../../../services/rating/user-rating.service';
import {error} from 'util';
import {HttpClient} from '@angular/common/http';
import {SitterProfileService} from '../../../services/sitter-service/sitter-profile.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  sub: any;
  username: string;
  user: any;
  //

  // USER RATING
  userRatings: Observable<UserRatingModel[]>;
  currentRate: number;

  // IMAGE VARIABLES
  message: string;

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  // SITTER DATA
  sitterServices;
  private: any;

  // VISITOR
  visitorRating: number;
  visitorMessage: any;


  constructor(
    private profileService: UserProfileService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private token: TokenStorageService,
    private userRatingService: UserRatingService,
    private snackBar: MatSnackBar,
    private sitterProfileService: SitterProfileService) {
  }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      this.username = params.get('username');
    });

    this.profileService.getUserProfile(this.username).subscribe(data => {
      this.user = data;

      this.getImage();
      this.getUserRatings();
      this.getSitterServices();
    });
  }


  getImage() {
    this.http.get('http://localhost:8080/image/get/' + this.user.id)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        });
  }


  getUserRatings() {
    const userId = this.user.id;
    this.userRatingService.getAllUserRatings(userId).subscribe(response => {

      this.userRatings = response;
      let sum = 0;

      // tslint:disable-next-line:only-arrow-functions
      response.forEach(function(rating) {
        sum += rating.stars;
      });
      // console.log(sum / response.length);
      this.currentRate = sum / response.length;

    });
  }

  getSitterServices() {
    this.sitterProfileService.getSitterData(this.user.id).subscribe(response => {
      // console.log(response.serviceModelSet);
      this.sitterServices = response.serviceModelSet;
    });
  }

  postUserRating() {
    const userRating = new UserRatingModel();
    userRating.fromUser = this.token.getUser().id;

    const date: Date = new Date();
    userRating.rateDate = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getUTCMinutes();

    userRating.message = this.visitorMessage;
    userRating.stars = this.visitorRating;
    userRating.toUser = this.user.id;

    this.userRatingService.postUserRating(userRating).subscribe(response => {
      this.snackBar.open(response.message, 'OK', {
        duration: 4000,
      });
      // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.message, 'OK', {
        duration: 4000,
      });
    });
  }

}
