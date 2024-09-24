import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountsOfStatistics, CurrentUser, User } from '../Models/user';

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
  
  getUserById(userId:string): Observable<any> {
    return this.http.get(this.apiUrl+userId,{
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

  deleteUser(user:CurrentUser): Observable<any> {
    return this.http.delete(this.apiUrl+user.id,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }

  updateUser(user:any): Observable<any> {
    return this.http.put(this.apiUrl,user,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }

  CountsOfStatistics(): Observable<CountsOfStatistics> {
    return this.http.get<CountsOfStatistics>(this.apiUrl+'Counts',{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
