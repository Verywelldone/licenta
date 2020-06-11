import {Component, OnInit} from '@angular/core';
import {PasswordRecoveryService} from '../../../services/password-recovery.service';
import {AccountRecoveryModel} from '../../../model/user/account-recovery.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  recoveryModel: AccountRecoveryModel;


  foundUser: boolean = false;
  uid: number;
  newPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  rememberedField: string;
  field: any;

  // fpForm = new FormGroup({
  //   'newPassword': new FormControl(this.newPassword,[
  //     Validators.required,
  //     Validators.minLength(6)
  //   ])
  // })

  constructor(private pwdService: PasswordRecoveryService, private formBuilder: FormBuilder) {
    this.recoveryModel = new AccountRecoveryModel();
  }

  ngOnInit() {
  }

  getUserByUsername() {
    console.log(this.recoveryModel);
    this.pwdService.getUserIdByUsername(this.recoveryModel).subscribe(response => {
      this.foundUser = true;
      this.uid = response;
    });
  }

  getUserByEmail() {
    console.log(this.recoveryModel);

    this.pwdService.getUserIdByEmail(this.recoveryModel).subscribe(response => {
      this.foundUser = true;
      this.uid = response;
    });
  }

  resetPassword() {

    this.pwdService.resetPassword(this.uid, this.newPassword).subscribe(response => {
      console.log(response);
    });
  }

  print() {
    console.log(this.newPassword);
  }
}
