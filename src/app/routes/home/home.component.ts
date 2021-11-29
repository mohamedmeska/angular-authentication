import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { HomeService } from 'src/shared/services/home.service';
import { IPost } from 'src/shared/interfaces/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  posts: IPost[];

  constructor(
    private _authService: AuthService,
    private _homeService: HomeService
  ) { }

  ngOnInit() {
    this._homeService
    .getPosts()
    .subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => {
        if (error.status === 401) {
          this._authService.signout();
          location.reload();
        }
      }
    )
  }
}
