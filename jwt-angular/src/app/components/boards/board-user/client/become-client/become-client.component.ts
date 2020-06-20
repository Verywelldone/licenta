import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../../../services/token-storage.service';
import {UserAuthoritiesService} from '../../../../../services/user-authorities.service';
import {ClientPageService} from '../../../../../services/client-service/client-page.service';
import {SitterProfileService} from '../../../../../services/sitter-service/sitter-profile.service';
import {MatDatepickerInputEvent, MatSnackBar} from '@angular/material';
import {formatDate} from '@angular/common';
import {SitterResponseModel} from '../../../../../model/client/client-request.model';
import {sitterResponseServiceModel} from '../../../../../model/client/client-request-service.model';
import {ClientSitterRequestService} from '../../../../../services/client-service/client-sitter-request.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-become-client',
  templateUrl: './become-client.component.html',
  styleUrls: ['./become-client.component.css']
})
export class BecomeClientComponent implements OnInit {

  latitude;
  longitude;
  curentUser: any;
  users: any;
  selectedUser: any;
  selectedSitterData: any;

  distanceBetween: any;
  labelOptions = {
    backgroundColor: '#3F51B5',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    text: 'You',
  };
  isSitterChosen: boolean;
  startAtDate: Date;
  endAtDate: Date;
  todayDate = new Date();
  dateDifference: any;
  clientSelectedServices;

  requestMessage: string;
  hasErrors: boolean;

  constructor(
    private token: TokenStorageService,
    private clientPageService: ClientPageService,
    private sitterProfileService: SitterProfileService,
    private router: Router,
    private snackBar: MatSnackBar,
    private clientSitterRequestService: ClientSitterRequestService) {
  }

  ngOnInit() {
    this.curentUser = this.token.getUser();
    this.latitude = +this.curentUser.userDetails.userCoordinates.latitude;
    this.longitude = +this.curentUser.userDetails.userCoordinates.longitude;

    this.todayDate = new Date();
    this.selectedSitterData = 'test';

    this.clientSelectedServices = new Array<sitterResponseServiceModel>();
    this.reloadData();
  }


  onSelect(user: any): void {
    this.selectedUser = user;

    this.getSitterData(this.selectedUser.id);
    this.haversineDistance();
  }

  reloadData() {
    this.clientPageService.getSittersList().subscribe(data => {

        // console.log(data);
        this.users = data;

        //remove current user
        const removeIndex = this.users.map(item => {
          console.log(item);
          return item.id;
        }).indexOf(this.curentUser.id);

        if (removeIndex !== -1) {
          console.log(removeIndex + ' removeindex');
          this.users.splice(removeIndex, 1);
        }
        //
      }
    );
  }

  getSitterData(userId: number) {
    this.sitterProfileService.getSitterData(userId).subscribe(data => {
      this.selectedSitterData = data;
    });
  }


  haversineDistance() {
    const currentUserLocation = this.token.getUser().userDetails.userCoordinates;
    const currentUserLatitude = currentUserLocation.latitude;
    const currentUserLongitude = currentUserLocation.longitude;

    const selectedUserLocation = this.selectedUser.userDetails.userCoordinates;
    const selectedUserLatitude = selectedUserLocation.latitude;
    const selectedUserLongitude = selectedUserLocation.longitude;

    const R = 6371.0710; // Radius of the Earth in km
    const rlat1 = currentUserLatitude * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = selectedUserLatitude * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon = (selectedUserLongitude - currentUserLongitude) * (Math.PI / 180); // Radian difference (longitudes)

    const d = 2 * R * Math.asin(Math.sqrt(
      Math.sin(difflat / 2)
      * Math.sin(difflat / 2)
      + Math.cos(rlat1)
      * Math.cos(rlat2)
      * Math.sin(difflon / 2)
      * Math.sin(difflon / 2)));

    this.distanceBetween = Math.floor(d);
  }

  pickSitter() {
    this.isSitterChosen = !this.isSitterChosen;
  }


  addEvent(change: string, event: MatDatepickerInputEvent<unknown>) {

    if (change === 'startDate') {
      // @ts-ignore
      this.startAtDate = new Date(event.value);
    } else {
      // @ts-ignore
      this.endAtDate = new Date(event.value);
    }

    if (this.startAtDate && this.endAtDate) {
      this.dateDifference = -Math.floor((
        Date.UTC(this.endAtDate.getFullYear(), this.endAtDate.getMonth(), this.endAtDate.getDate()) -
        Date.UTC(this.startAtDate.getFullYear(), this.startAtDate.getMonth(), this.startAtDate.getDate()))
        / (1000 * 60 * 60 * 24)
      );
    }


  }

  submitRequest() {

    if (this.endAtDate === undefined || this.endAtDate === undefined) {
      this.hasErrors = true;
      this.requestMessage = 'Please, select a Starting date and an Ending date!';
    } else if (this.clientSelectedServices.length === 0) {
      this.hasErrors = true;
      this.requestMessage = ' Please select at least one service!';
    } else {
      this.requestMessage = '';
      this.hasErrors = false;
      // const format = ' dd/MM/yyy';

      // this.startAtDate = formatDate(this.startAtDate, format, 'en');
      // this.endAtDate = formatDate(this.endAtDate, format, 'en');

      const sitterResponse = new SitterResponseModel();
      sitterResponse.fromClient = this.token.getUser().id;
      sitterResponse.toSitter = this.selectedUser.id;
      sitterResponse.startDate = this.startAtDate;
      sitterResponse.endDate = this.endAtDate;

      sitterResponse.services = this.clientSelectedServices;

      this.clientSitterRequestService.submitSitterRequest(sitterResponse).subscribe(response => {
        this.snackBar.open(response, 'OK', {
          duration: 4000,
        });
        this.router.navigate(['/client-dashboard']).then(r => this.router.navigate(['/client-dashboard']));
      }, error => {
        console.log(error);
        this.snackBar.open(error.error, 'OK', {
          duration: 4000,
        });
      });
    }
  }

  handleSitterService(event, service) {

    const clientReq = new sitterResponseServiceModel();
    clientReq.name = service.name;
    clientReq.price = service.price;


    if (event.source.checked) {
      this.clientSelectedServices.push(clientReq);
    } else {
      const index: number = this.clientSelectedServices.indexOf(event.source.value);
      this.clientSelectedServices.splice(index, 1);
    }

    console.log(this.clientSelectedServices);
  }

  viewSitterProfile() {
    this.router.navigate(['user-profile/'+this.selectedUser.username])
  }
}
