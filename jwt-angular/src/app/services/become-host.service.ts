import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BecomeHostService {

  SUBMIT_API = 'http://localhost:8080/sitter/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  submitSitterRequest(data: any) {
    console.log(data);
    this.http.post( 'http://localhost:8080/sitter/submit', data, this.httpOptions).subscribe(message => {
      console.log(message);
    });
  }


}
