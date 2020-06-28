import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-client-pending-requests',
  templateUrl: './client-pending-requests.component.html',
  styleUrls: ['./client-pending-requests.component.css']
})
export class ClientPendingRequestsComponent implements OnInit {

  @Input() sitterPendingRequests: any;
  columnsToDisplay = ['Name', 'Price'];

  constructor() { }

  ngOnInit() {
    console.log(this.sitterPendingRequests);
  }

  changeValue(startDate: any) {
    const date = new Date(startDate);
    const mnth = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return [day, mnth, date.getFullYear()].join('/');
  }

}
