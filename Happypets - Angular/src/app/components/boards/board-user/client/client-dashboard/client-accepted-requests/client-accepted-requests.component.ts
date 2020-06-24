import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-client-accepted-requests',
  templateUrl: './client-accepted-requests.component.html',
  styleUrls: ['./client-accepted-requests.component.css']
})
export class ClientAcceptedRequestsComponent implements OnInit {
  @Input() sitterAcceptedRequests: any;

  constructor() { }

  ngOnInit() {
  }

}
