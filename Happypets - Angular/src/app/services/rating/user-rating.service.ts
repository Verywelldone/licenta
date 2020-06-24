import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserRatingModel} from '../../model/user/user-rating.model';

const BASE_URL = 'http://localhost:8080/api/user/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserRatingService {


  constructor(private http: HttpClient) {
  }

  getAllUserRatings(userId: number): Observable<any> {
    return this.http.get(BASE_URL + 'get-ratings/' + userId);
  }
  getAsyncRating(userId: number) {
    return this.http.get(BASE_URL + 'get-ratings/' + userId);
  }

  postUserRating(userRating: UserRatingModel): Observable<any> {
    return this.http.post(BASE_URL + 'save-rating', userRating, httpOptions);
  }
}
