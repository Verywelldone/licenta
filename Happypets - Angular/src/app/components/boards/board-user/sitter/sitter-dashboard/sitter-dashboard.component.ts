import {Component, Input, OnInit} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';
import {SitterPendingRequestsComponent} from './sitter-pending-requests/sitter-pending-requests.component';
import {TokenStorageService} from '../../../../../services/token-storage.service';
import {SitterProfileService} from '../../../../../services/sitter-service/sitter-profile.service';

@Component({
  selector: 'app-sitter-dashboard',
  templateUrl: './sitter-dashboard.component.html',
  styleUrls: ['./sitter-dashboard.component.css']
})
export class SitterDashboardComponent implements OnInit {
  pendingRequests: any;
  acceptedRequests: any;
  declinedRequests: any;

  pendingRequestsSize: number;
  acceptedRequestsSize: number;
  declinedRequestsSize: number;

  constructor(private token: TokenStorageService, private sitterProfileService: SitterProfileService) {
  }

  ngOnInit() {
    this.getDeclinedRequests();
    this.getAcceptedRequests();
    this.getPendingRequests();
  }

  getPendingRequests() {
    this.sitterProfileService.getSitterPendingRequests(this.token.getUser().id).subscribe(response => {
      // console.log(response);
      if (response) {
        this.pendingRequests = response;
        this.pendingRequestsSize = response.length;
      } else {
        this.pendingRequestsSize = 0;
      }
    });
  }

  getAcceptedRequests() {
    this.sitterProfileService.getSitterAcceptedRequests(this.token.getUser().id).subscribe(response => {
      // console.log(response);
      if (response) {
        this.acceptedRequests = response;
        this.acceptedRequestsSize = response.length;
      } else {
        this.acceptedRequestsSize = 0;
      }
    });
  }

  getDeclinedRequests() {
    this.sitterProfileService.getSitterDeclinedRequests(this.token.getUser().id).subscribe(response => {
      if (response) {
        this.declinedRequests = response;
        this.declinedRequestsSize = this.declinedRequests.length;
      } else {
        this.declinedRequestsSize = 0;
      }
    });
  }


  onTabClickEvent(event: MatTabChangeEvent) {
    switch (event.index) {
      case 1: {
        this.getPendingRequests();
        break;
      }
      case 2: {
        this.getAcceptedRequests();
        break;
      }
      case 3: {
        this.getDeclinedRequests();
        break;
      }
      default:
        break;
    }
  }
}
