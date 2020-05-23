import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sitter-accepted-requests',
  templateUrl: './sitter-accepted-requests.component.html',
  styleUrls: ['./sitter-accepted-requests.component.css']
})
export class SitterAcceptedRequestsComponent implements OnInit {

  @Input() sitterAcceptedRequests: any;

  constructor() {
  }

  ngOnInit() {
  }

}
