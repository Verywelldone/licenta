import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ClientProfileService {
  private baseUrl = 'http://localhost:8080/api/client/';


  constructor(private http: HttpClient) {
  }

  getSitterPendingRequests(userId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'pending-requests/' + userId);
  }

  getSitterAcceptedRequests(userId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'accepted-requests/' + userId);
  }

  getSitterDeclinedRequests(userId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'declined-requests/' + userId);
  }
}
