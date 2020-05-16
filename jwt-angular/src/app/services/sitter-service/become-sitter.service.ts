import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BecomeSitterService {

  SUBMIT_API = 'http://localhost:8080/sitter/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  submitSitterRequest(data: any): Observable<any> {
    console.log(data);
    return this.http.post('http://localhost:8080/sitter/submit', data, this.httpOptions);
  }
}
