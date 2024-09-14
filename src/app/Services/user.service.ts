import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl='http://localhost:3000/api/user/';

  constructor(private http:HttpClient) { }

  currentUser(): Observable<any> {
    return this.http.get(this.apiUrl+'current-user',{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
