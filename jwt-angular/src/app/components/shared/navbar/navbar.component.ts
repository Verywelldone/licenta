import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../services/token-storage.service';
import {SitterProfileService} from '../../../services/sitter-service/sitter-profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  isSitter

  constructor(private tokenStorageService: TokenStorageService, private sitterProfileService: SitterProfileService) {
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    this.sitterProfileService.getSitterData().subscribe(data => {
      console.log(data);
      this.isSitter = data.active;
    });
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
