import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  canActivate(): boolean {
    let checkUserSignin = !!localStorage.getItem('user_access_token');
    if (!this._authService.isLoggedIn || !checkUserSignin) {
      this._router.navigate(['signin']);
    }
    return this._authService.isLoggedIn.value || checkUserSignin;
  }

}
