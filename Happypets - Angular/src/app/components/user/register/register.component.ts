import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {UserData} from '../../../model/user/user-data.model';
import {UserAccountStatusModel} from '../../../model/user/user-account-status.model';
import {UserCoordinates} from '../../../model/user/user-coordinates.model';
import {formatDate} from '@angular/common';
import {Router} from '@angular/router';
import {CometChat} from '@cometchat-pro/chat/CometChat';
import {COMETCHAT_CONSTANTS} from '../../shared/CONSTS';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {google} from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  userDetails: UserData = new UserData();
  userAccountStatus: UserAccountStatusModel = new UserAccountStatusModel();
  userCoordinates: UserCoordinates = new UserCoordinates();
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  latitude;
  longitude;
  userCountry;
  userCity;
  securityQuestion;

  constructor(private authService: AuthService,
              private router: Router,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.getLocation();
  }

  onSubmit() {
    this.userCoordinates.longitude = this.longitude;
    this.userCoordinates.latitude = this.latitude;


    this.userAccountStatus.createdAt = formatDate(new Date(), 'dd/MM/yyyy hh:mm', 'en');
    this.userAccountStatus.updatedAt = formatDate(new Date(), 'dd/MM/yyyy hh:mm', 'en');
    this.userAccountStatus.lastLogin = formatDate(new Date(), 'dd/MM/yyyy hh:mm', 'en');

    this.userAccountStatus.isBanned = false;
    this.userAccountStatus.isConfirmed = false;

    this.userDetails.userCoordinates = this.userCoordinates;
    this.userDetails.city = this.userCity;
    this.userDetails.country = this.userCountry;
    // this.userDetails.securityQuestion = this.securityQuestion;
    console.log(this.userDetails);


    this.authService.register(this.form, this.userDetails, this.userAccountStatus).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;


        console.log(this.form.email);

        // Start CometChat

        const name = this.userDetails.firstName + ' ' + this.userDetails.lastName;
        const uid = this.form.username;
        const user = new CometChat.User(uid);
        user.setName(name);

        CometChat.createUser(user, COMETCHAT_CONSTANTS.apiKey).then(
          // tslint:disable-next-line:no-shadowed-variable
          user => {
            console.log('CometChat user created', user);
          }, error => {
            console.log('CometChat error', error);
          }
        );
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 3000);

      },
      err => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        console.log('User latitude: ' + this.latitude + '; Longitude: ' + this.longitude);
        this.callApi(this.longitude, this.latitude);

        var latlng = this.latitude + ',' + this.longitude;
        // GET COUNTRY AND CITY FROM GEOLOCATION
        this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='
          + position.coords.latitude + ','
          + position.coords.longitude
          + '&key=AIzaSyBYeSZf4AVXQ3CNVDTcU3i_JCIv8001CLA')
          .subscribe(result => {
            let jsonResponse = JSON.stringify(result['plus_code']);

            for (let key in result) {
              console.log(result['plus_code'].compound_code);
              var location = result['plus_code'].compound_code;
              var data = location.trim().split(',');
              this.userCity = data[0].split(' ')[1];
              this.userCountry = data[1].replace('"', '').trim();
              break;
            }

          });
      });
    } else {
      console.log('No support for geolocation');
    }

  }

  callApi(Longitude: number, Latitude: number) {
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`;
    // Call API
  }

  print() {
    console.log(this.securityQuestion);
  }

  redirectToLogin() {
    this.router.navigate(['login']).then(r => this.router.navigate(['login']));
  }
}
