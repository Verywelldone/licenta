import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientPageService {

  private baseUrl = 'http://localhost:8080/api/client/';

  constructor(private http: HttpClient) {
  }

  getSittersList(): Observable<any> {
    return this.http.get(this.baseUrl + 'sitter-list');
  }
}
