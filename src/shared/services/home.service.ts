import { IPost } from './../interfaces/post';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private _http: HttpClient
  ) { }

  getPosts(): Observable<IPost[]>{
    return this._http.get<IPost[]>('/posts');
  }
}
