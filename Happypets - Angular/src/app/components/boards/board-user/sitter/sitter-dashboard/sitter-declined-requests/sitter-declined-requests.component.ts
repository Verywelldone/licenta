import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sitter-declined-requests',
  templateUrl: './sitter-declined-requests.component.html',
  styleUrls: ['./sitter-declined-requests.component.css']
})
export class SitterDeclinedRequestsComponent implements OnInit {

  @Input() sitterDeclinedRequests: any;
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
