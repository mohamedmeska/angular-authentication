import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { AuthService } from 'src/shared/services/auth.service';
import { UsersModel } from 'src/shared/models/users';
import { PostsModel } from 'src/shared/models/posts';
import { IUser } from 'src/shared/interfaces/user';

let usersModel = new UsersModel();
let postsModel = new PostsModel();

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let { url, method, headers, body } = request;

    let authToken = this._authService.getToken();
    headers = headers.set('Authorization', `Bearer ${authToken}`);

    return of(null)
      .pipe(mergeMap(handleEndPoint))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleEndPoint() {
      switch (true) {
        case url.endsWith('/signin') && method === 'POST':
          return authenticate();
        case url.endsWith('/posts') && method === 'GET':
          return getPosts();
        default:
          return next.handle(request);
      }
    }

    function authenticate() {
      const { username, password } = body;
      const user = usersModel.users.find(
        (userAccount: IUser) =>
          userAccount.username === username && userAccount.password === password
      );
      if (!user) return error('Username or Password is incorrect');
      return ok({
        id: user.id,
        userId: user.userId,
        username: user.username,
        token: 'fake-token'
      });
    }

    function getPosts() {
      if (isLoggedIn()) return ok(postsModel.posts);
      return unauthorized('Unauthorized');
    }

    function ok(body?: {}) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message?: string) {
      return throwError({ message });
    }

    function unauthorized(message?: string) {
      return throwError({ status: 401, message });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-token';
    }
  }
}
