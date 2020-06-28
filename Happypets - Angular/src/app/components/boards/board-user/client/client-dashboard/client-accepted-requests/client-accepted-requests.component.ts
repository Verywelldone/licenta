import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-client-accepted-requests',
  templateUrl: './client-accepted-requests.component.html',
  styleUrls: ['./client-accepted-requests.component.css']
})
export class ClientAcceptedRequestsComponent implements OnInit {
  @Input() sitterAcceptedRequests: any;
  columnsToDisplay = ['Name', 'Price'];

  constructor() {
  }

  ngOnInit() {
  }

  changeValue(startDate: any) {
    const date = new Date(startDate);
    const mnth = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return [day, mnth, date.getFullYear()].join('/');
  }

}
