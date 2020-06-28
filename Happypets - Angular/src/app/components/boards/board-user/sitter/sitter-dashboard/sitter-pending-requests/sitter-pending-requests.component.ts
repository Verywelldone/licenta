import {Component, OnInit, Input} from '@angular/core';
import {TokenStorageService} from '../../../../../../services/token-storage.service';
import {SitterProfileService} from '../../../../../../services/sitter-service/sitter-profile.service';
import {MatSnackBar} from '@angular/material';
// @ts-ignore
import moment = require('moment');



@Component({
  selector: 'app-sitter-pending-requests',
  templateUrl: './sitter-pending-requests.component.html',
  styleUrls: ['./sitter-pending-requests.component.css']
})
export class SitterPendingRequestsComponent implements OnInit {

  @Input() clientPendingRequests: any;
  columnsToDisplay = ['Name', 'Price'];

  constructor(private token: TokenStorageService,
              private sitterProfileService: SitterProfileService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {

  }

  acceptRequest(id: any) {
    this.snackBar.open('Request Accepted', 'OK', {
      duration: 2000,
    });
    this.sitterProfileService.acceptRequest(id).subscribe(response => {
      // console.log(response)
    });

    const removeIndex = this.clientPendingRequests.map(request => {
      return request.id;
    }).indexOf(id);

    this.clientPendingRequests.splice(removeIndex, 1);
  }

  declineRequest(id: any) {
    this.snackBar.open('Request deleted', 'OK', {
      duration: 2000,
    });
    this.sitterProfileService.declineRequest(id).subscribe(response => {

    });

    const removeIndex = this.clientPendingRequests.map(request => {
      return request.id;
    }).indexOf(id);

    this.clientPendingRequests.splice(removeIndex, 1);
  }

  refresh() {
    window.location.reload();
  }



  changeValue(startDate: any) {

    const date = new Date(startDate);
    const mnth = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return [day, mnth, date.getFullYear()].join('/');
  }

  getTimeLeftUntilServiceStarts(startDate: any) {
    const today = new Date();

    startDate = new Date(startDate);
    return -Math.floor((
      Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) -
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
      / (1000 * 60 * 60 * 24)
    );
  }

}
