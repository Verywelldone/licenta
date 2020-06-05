import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {UserData} from '../../../model/user-data.model';
import {UserAccountStatusModel} from '../../../model/user-account-status.model';
import {UserCoordinates} from '../../../model/user-coordinates.model';
import {formatDate} from '@angular/common';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {CometChat} from '@cometchat-pro/chat/CometChat';
import {environment} from '../../../../environments/environment';
import {COMETCHAT_CONSTANTS} from '../../shared/CONSTS';

let viewChild = ViewChild;

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


  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog) {
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
    this.authService.register(this.form, this.userDetails, this.userAccountStatus).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;


        console.log(this.form.email);

        // Start CometChat

        const name = this.userDetails.firstName + ' ' + this.userDetails.lastName;
        const uid = this.form.email.substring(0,this.form.email.indexOf('@'));
        const user = new CometChat.User(uid);
        user.setName(name);

        CometChat.createUser(user, COMETCHAT_CONSTANTS.apiKey).then(
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
      });
    } else {
      console.log('No support for geolocation');
    }
  }

  callApi(Longitude: number, Latitude: number) {
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`;
    // Call API
  }
}
