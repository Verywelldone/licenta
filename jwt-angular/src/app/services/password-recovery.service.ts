import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountRecoveryModel} from '../model/user/account-recovery.model';
import {FormControl} from '@angular/forms';

const BASE_URL = 'http://localhost:8080/password-recovery';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {

  constructor(private http: HttpClient) {

  }

  getUserIdByEmail(recovery: AccountRecoveryModel): Observable<any> {
    return this.http.post(BASE_URL + '/email', recovery, httpOptions);
  }

  getUserIdByUsername(recovery: AccountRecoveryModel): Observable<any> {
    return this.http.post(BASE_URL + '/username', recovery, httpOptions);
  }

  resetPassword(id: number, newPassword: FormControl): Observable<any> {

    let newPasswordDTO = {
      userId: id,
      newPassword: newPassword.value
    };

    console.log(newPasswordDTO)
    return this.http.post(BASE_URL + '/pwd-reset', newPasswordDTO, httpOptions);
  }

}
