import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SitterProfileService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient, private token: TokenStorageService) {
  }

  getSitterData(): Observable<any> {
    const userId = this.token.getUser().id;
    return this.http.get(this.baseUrl + 'sitter/info/' + userId);
  }
}
