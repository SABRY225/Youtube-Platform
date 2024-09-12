import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl='https://youtubeplatformapi-production.up.railway.app/api/auth/';

  constructor(private http:HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl+'register', user);
  }
}
