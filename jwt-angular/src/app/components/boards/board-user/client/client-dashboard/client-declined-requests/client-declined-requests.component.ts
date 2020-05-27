import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-client-declined-requests',
  templateUrl: './client-declined-requests.component.html',
  styleUrls: ['./client-declined-requests.component.css']
})
export class ClientDeclinedRequestsComponent implements OnInit {

  @Input() sitterDeclinedRequests: any;

  constructor() { }

  ngOnInit() {
  }

}
