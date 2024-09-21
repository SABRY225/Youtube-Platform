import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUser } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  private apiUrl='http://localhost:3000/api/subscriptions/';

  constructor(private http:HttpClient) { }

  getSubscriptions(user:CurrentUser): Observable<any> {
    console.log(user);
    
    return this.http.get(this.apiUrl+user.id,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
