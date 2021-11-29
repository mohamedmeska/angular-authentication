import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from '../interfaces/user';
import { ISignedinUser } from '../interfaces/signedin-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = new BehaviorSubject(false);
  currentUser: ISignedinUser | any = new BehaviorSubject(null);

  constructor(
    private _http: HttpClient
  ) {
    this.isLoggedIn.next(!!(localStorage.getItem('user_access_token')));
  }

  signin(user: IUser): Observable<ISignedinUser> {
    return this._http
      .post<ISignedinUser>('/signin', user)
      .pipe(
        catchError((error) => {
          return throwError(error.message || 'Server Error!');
        })
      );
  }

  signout() {
    localStorage.removeItem('user_access_token');
    this.isLoggedIn.next(false);
    this.currentUser.next(null);
  }

  getToken() {
    return localStorage.getItem('user_access_token');
  }
}
