import {Component, Input, OnInit} from '@angular/core';
import {SitterProfileService} from '../../../../../../services/sitter-service/sitter-profile.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sitter-accepted-requests',
  templateUrl: './sitter-accepted-requests.component.html',
  styleUrls: ['./sitter-accepted-requests.component.css']
})
export class SitterAcceptedRequestsComponent implements OnInit {

  @Input() sitterAcceptedRequests: any;
  columnsToDisplay = ['Name', 'Price'];

  constructor(private sitterProfileService: SitterProfileService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }


  changeValue(startDate: any) {
    const date = new Date(startDate);
    const mnth = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('/');
  }

  cancelAccept(id: any) {

    this.snackBar.open('Order returned to Pending', 'OK', {
      duration: 2000,
    });

    const removeIndex = this.sitterAcceptedRequests.map(request => {
      return request.id;
    }).indexOf(id);

    this.sitterAcceptedRequests.splice(removeIndex, 1);

    this.sitterProfileService.cancelAccept(id).subscribe(response => {

      // console.log(response);
    }, error => {
      console.log(error.error);
    });
    // console.log(id);
  }
}
