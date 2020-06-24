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


  changeValue(startDate: any) {
    const date = new Date(startDate);
    const mnth = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return [day, mnth, date.getFullYear()].join('/');

  }
}
