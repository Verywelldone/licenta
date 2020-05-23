import {Component, OnInit, Input} from '@angular/core';
import {TokenStorageService} from '../../../../../../services/token-storage.service';
import {SitterProfileService} from '../../../../../../services/sitter-service/sitter-profile.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-sitter-pending-requests',
  templateUrl: './sitter-pending-requests.component.html',
  styleUrls: ['./sitter-pending-requests.component.css']
})
export class SitterPendingRequestsComponent implements OnInit {

  @Input() clientPendingRequests: any;

  constructor(private token: TokenStorageService, private sitterProfileService: SitterProfileService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

  }

  acceptRequest(id: any) {
    this.snackBar.open('Request Accepted', 'OK', {
      duration: 2000,
    });
    this.sitterProfileService.acceptRequest(id);

    const removeIndex = this.clientPendingRequests.map(request => {
      return request.id;
    }).indexOf(id);

    this.clientPendingRequests.splice(removeIndex, 1);
  }

  declineRequest(id: any) {
    this.snackBar.open('Request deleted', 'OK', {
      duration: 2000,
    });
    this.sitterProfileService.declineRequest(id);

    const removeIndex = this.clientPendingRequests.map(request => {
      return request.id;
    }).indexOf(id);

    this.clientPendingRequests.splice(removeIndex, 1);
  }

  refresh() {
    window.location.reload();
  }

}
