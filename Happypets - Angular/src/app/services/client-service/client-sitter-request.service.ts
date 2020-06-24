import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SitterResponseModel} from '../../model/client/client-request.model';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ClientSitterRequestService {
  private baseUrl = 'http://localhost:8080/api/client/';

  constructor(private http: HttpClient) {
  }

  submitSitterRequest(clientSitterRequest: SitterResponseModel): Observable<any> {
    return this.http.post(this.baseUrl + 'sitter-request', clientSitterRequest, {responseType: 'text'});
  }

}
