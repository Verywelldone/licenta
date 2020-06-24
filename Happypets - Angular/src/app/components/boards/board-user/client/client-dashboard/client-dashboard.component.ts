import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../../../services/token-storage.service';
import {SitterProfileService} from '../../../../../services/sitter-service/sitter-profile.service';
import {MatTabChangeEvent} from '@angular/material';
import {ClientProfileService} from '../../../../../services/client-service/client-profile.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {

  pendingRequests: any;
  acceptedRequests: any;
  declinedRequests: any;

  constructor(private token: TokenStorageService, private clientProfileService: ClientProfileService) {
  }

  ngOnInit() {
    this.getPendingRequests();
    this.getDeclinedRequests();
    this.getAcceptedRequests();
  }

  getPendingRequests() {
    this.clientProfileService.getSitterPendingRequests(this.token.getUser().id).subscribe(response => {
      this.pendingRequests = response;
    });
  }

  getAcceptedRequests() {
    this.clientProfileService.getSitterAcceptedRequests(this.token.getUser().id).subscribe(response => {
      this.acceptedRequests = response;
    });
  }

  getDeclinedRequests() {
    this.clientProfileService.getSitterDeclinedRequests(this.token.getUser().id).subscribe(response => {
      this.declinedRequests = response;
    });
  }


  onTabClickEvent(event: MatTabChangeEvent) {
    switch (event.index) {
      case 0: {
        this.getPendingRequests();
        break;
      }
      case 1: {
        this.getAcceptedRequests();
        break;
      }
      case 2: {
        this.getDeclinedRequests();
        break;
      }
      default:
        break;
    }
  }

}
