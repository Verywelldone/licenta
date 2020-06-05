import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {CometChat} from '@cometchat-pro/chat/CometChat';
import {environment} from '../../../../environments/environment';
import {COMETCHAT_CONSTANTS} from '../../shared/CONSTS';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) {

  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        // CometChat Login

        const uid = data.email.substring(0,data.email.indexOf('@'));

        CometChat.login(uid, COMETCHAT_CONSTANTS.apiKey).then(
          user => {
            console.log("CometChat Login Successful:", { user });
            this.reloadPage();
          },
          error => {
            console.log("CometChat Login failed with exception:", { error });
          }
        );


      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    // window.location.href('main');
    window.location.href = 'home';
  }
}
