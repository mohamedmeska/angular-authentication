import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.sass']
})
export class AppHeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._authService.isLoggedIn.subscribe((response) => {
      this.isLoggedIn = response;
    });
  }

  handleSignout() {
    this._authService.signout();
    this._router.navigate(['signin']);
  }

}
