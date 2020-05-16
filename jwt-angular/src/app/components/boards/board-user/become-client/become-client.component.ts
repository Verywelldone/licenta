import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../../services/token-storage.service';
import {UserAuthoritiesService} from '../../../../services/user-authorities.service';
import {ClientPageService} from '../../../../services/client-service/client-page.service';

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

  constructor(private token: TokenStorageService, private clientPageService: ClientPageService) {
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
    this.clientPageService.getSittersList().subscribe(data => {
        console.log(data);
        this.users = data;

        const removeIndex = this.users.map(item => {
          return item.id;
        }).indexOf(this.curentUser.id);

        this.users.splice(removeIndex, 1);

      }
    );
  }

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
  }
}
