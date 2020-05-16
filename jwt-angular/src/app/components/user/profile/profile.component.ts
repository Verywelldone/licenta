import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../services/token-storage.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  // imageName: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  constructor(private token: TokenStorageService, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    // this.getImage();
  }

  // getImage() {
  //   console.log(this.token.getUser().id);
  //   this.httpClient.get('http://localhost:8080/image/get/' + this.token.getUser().id)
  //     .subscribe(
  //       res => {
  //         this.retrieveResonse = res;
  //         this.base64Data = this.retrieveResonse.picByte;
  //         this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  //       }
  //     );
  // }
}
