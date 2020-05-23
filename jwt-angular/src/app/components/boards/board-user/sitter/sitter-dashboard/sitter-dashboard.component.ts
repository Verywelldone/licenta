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

  constructor(private token: TokenStorageService, private sitterProfileService: SitterProfileService) {
  }

  ngOnInit() {
  }

  getPendingRequests() {
    this.sitterProfileService.getSitterPendingRequests(this.token.getUser().id).subscribe(response => {
      // console.log(response);
      this.pendingRequests = response;
    });
  }

  getAcceptedRequests() {
    this.sitterProfileService.getSitterAcceptedRequests(this.token.getUser().id).subscribe(response => {
      this.acceptedRequests = response;
    });
  }

  getDeclinedRequests() {
    this.sitterProfileService.getSitterDeclinedRequests(this.token.getUser().id).subscribe(response => {
      this.declinedRequests = response;
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
    console.log(event.index);
  }
}
