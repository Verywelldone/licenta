import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-client-pending-requests',
  templateUrl: './client-pending-requests.component.html',
  styleUrls: ['./client-pending-requests.component.css']
})
export class ClientPendingRequestsComponent implements OnInit {

  @Input() sitterPendingRequests: any;

  constructor() { }

  ngOnInit() {
  }

}
