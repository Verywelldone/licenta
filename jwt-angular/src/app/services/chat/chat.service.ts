import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {
  }

  getAllActiveChats(userId: any): Observable<any> {
    return this.http.get(this.baseUrl + '/get-active/' + userId);
  }
}
