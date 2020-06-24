import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8080/api/user/profile/';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) {
  }

  getUserProfile(username: string): Observable<any> {
    return this.http.get(API_URL + username);
  }
}
