import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISignedinUser } from 'src/shared/interfaces/signedin-user';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  signinError: string;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    let checkUserSignin = !!localStorage.getItem('user_access_token');

    if (this._authService.isLoggedIn || checkUserSignin) {
      this._router.navigate(['home']);
    }

    this.signinForm = this._formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  handleSignin() {
    this._authService
    .signin(this.signinForm.value)
    .subscribe(
      (response: ISignedinUser) => {
        localStorage.setItem('user_access_token', response.token);
        let authToken = localStorage.getItem('user_access_token');
        if (!!authToken) {
          this._authService.isLoggedIn.next(true);
        }
        this._authService.currentUser.next(response);
        this._router.navigate(['home']);
      },
      (error) => {
        this.signinError = error;
      }
    );
  }
}
