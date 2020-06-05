import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  const;
  API_URL = 'http://localhost:8080/api/admin/';

  constructor(private http: HttpClient) {
  }

  getUserList(): Observable<any> {
    return this.http.get(this.API_URL + 'user-list');
  }
}
