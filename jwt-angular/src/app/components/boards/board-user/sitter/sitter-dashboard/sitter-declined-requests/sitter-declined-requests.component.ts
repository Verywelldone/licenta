import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sitter-declined-requests',
  templateUrl: './sitter-declined-requests.component.html',
  styleUrls: ['./sitter-declined-requests.component.css']
})
export class SitterDeclinedRequestsComponent implements OnInit {

  @Input() sitterDeclinedRequests: any;

  constructor() {
  }

  ngOnInit() {
  }

}
