import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {UserData} from '../../../model/user-data.model';
import {UserAccountStatusModel} from '../../../model/user-account-status.model';
import {UserCoordinates} from '../../../model/user-coordinates.model';


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


  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.getLocation();
  }

  onSubmit() {
    this.userCoordinates.longitude = this.longitude;
    this.userCoordinates.latitude = this.latitude;

    this.userAccountStatus.isActive = 'true';
    this.userAccountStatus.isBanned = 'false';
    this.userAccountStatus.isClient = 'false';
    this.userAccountStatus.isHost = 'false';

    this.userDetails.userCoordinates = this.userCoordinates;
    this.authService.register(this.form, this.userDetails, this.userAccountStatus).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
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
