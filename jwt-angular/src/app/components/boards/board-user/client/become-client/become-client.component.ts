import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../../../services/token-storage.service';
import {UserAuthoritiesService} from '../../../../../services/user-authorities.service';
import {ClientPageService} from '../../../../../services/client-service/client-page.service';
import {SitterProfileService} from '../../../../../services/sitter-service/sitter-profile.service';
import {MatDatepickerInputEvent} from '@angular/material';
import {formatDate} from '@angular/common';
import {ClientRequestModel} from '../../../../../model/client/client-request.model';
import {ClientRequestServiceModel} from '../../../../../model/client/client-request-service.model';
import {ClientSitterRequestService} from '../../../../../services/client-service/client-sitter-request.service';

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
  startAtDate = '';
  endAtDate = '';
  todayDate = new Date();
  dateDifference: any;
  clientSelectedServices;

  requestMessage: string;
  hasErrors: boolean;

  constructor(
    private token: TokenStorageService,
    private clientPageService: ClientPageService,
    private sitterProfileService: SitterProfileService,
    private clientSitterRequestService: ClientSitterRequestService) {
  }

  ngOnInit() {
    this.curentUser = this.token.getUser();
    this.latitude = +this.curentUser.userDetails.userCoordinates.latitude;
    this.longitude = +this.curentUser.userDetails.userCoordinates.longitude;

    this.todayDate = new Date();
    this.selectedSitterData = 'test';

    this.clientSelectedServices = new Array<ClientRequestServiceModel>();
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
          return item.id;
        }).indexOf(this.curentUser.id);

        this.users.splice(removeIndex, 1);

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
      this.startAtDate = event.value;
    } else {
      this.endAtDate = event.value;
    }
    // this.dateDifference = (this.startAtDate - this.endAtDate) / 1000 / 60 / 60 / 24;

  }

  submitRequest() {

    if (this.endAtDate === '' || this.startAtDate === '') {
      this.hasErrors = true;
      this.requestMessage = 'Please, select a Starting date and an Ending date!';
    } else if (this.clientSelectedServices.length === 0) {
      this.hasErrors = true;
      this.requestMessage = ' Please select at least one service!';
    } else {
      this.requestMessage = '';
      this.hasErrors = false;
      const format = ' dd/MM/yyy';

      this.startAtDate = formatDate(this.startAtDate, format, 'en');
      this.endAtDate = formatDate(this.endAtDate, format, 'en');

      const clientRequest = new ClientRequestModel();
      clientRequest.fromClient = this.token.getUser().id;
      clientRequest.toSitter = this.selectedUser.id;
      clientRequest.startDate = this.startAtDate;
      clientRequest.endDate = this.endAtDate;

      clientRequest.services = this.clientSelectedServices;

      this.clientSitterRequestService.submitSitterRequest(clientRequest).subscribe(response => {
        console.log(response);
      });
    }
  }

  handleSitterService(event, service) {

    const clientReq = new ClientRequestServiceModel();
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
}
