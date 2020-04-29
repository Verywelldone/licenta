import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../../services/token-storage.service';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-become-client',
  templateUrl: './become-client.component.html',
  styleUrls: ['./become-client.component.css']
})
export class BecomeClientComponent implements OnInit {

  latitude;
  longitude;
  locationChosen = false;
  curentUser: any;
  users: any;
  selectedUser: any;

  constructor(private token: TokenStorageService, private userService: UserService) {
  }

  ngOnInit() {
    this.curentUser = this.token.getUser();
    this.latitude = +this.curentUser.userDetails.userCoordinates.latitude;
    this.longitude = +this.curentUser.userDetails.userCoordinates.longitude;
    console.log(this.latitude + ' ' + this.longitude);
    this.reloadData();
  }


  onSelect(user: any): void {
    this.selectedUser = user;
  }

  reloadData() {
    this.userService.getUserList().subscribe(data => {
        console.log(data);
        this.users = data;
      }
    )
    ;
  }

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
  }
}
