import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SitterProfileService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }

  getSitterData(userId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'sitter/info/' + userId);
  }

  getSitterPendingRequests(userId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'sitter/pending-requests/' + userId);
  }

  getSitterAcceptedRequests(userId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'sitter/accepted-requests/' + userId);
  }

  getSitterDeclinedRequests(userId: any) {
    return this.http.get(this.baseUrl + 'sitter/declined-requests/' + userId);
  }

  acceptRequest(serviceId: number): Observable<any> {
    return this.http.post(this.baseUrl + 'sitter/accept-request', serviceId, httpOptions);
  }

  declineRequest(serviceId: number): Observable<any> {
    return this.http.post(this.baseUrl + 'sitter/decline-request', serviceId, httpOptions);
  }

  updateSitterProfile(userId: any, newSitterData): Observable<any> {
    return this.http.put(`${this.baseUrl}sitter/update-sitter/${userId}`, newSitterData, httpOptions);
  }

}
