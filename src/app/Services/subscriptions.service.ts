import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUser } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  private apiUrl='https://youtube-platform-api.vercel.app/api/subscriptions/';

  constructor(private http:HttpClient) { }

  getSubscriptions(user:CurrentUser): Observable<any> {
    return this.http.get(this.apiUrl+user.id,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }

  checkSubscription(userId:string,channelId:string): Observable<any> {
    return this.http.get(this.apiUrl+userId+'/'+channelId,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  subscribe(data:any): Observable<any> {
    return this.http.post(this.apiUrl,data,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  deleteSubscription(userId:string,channelId:string): Observable<any> {
    return this.http.delete(this.apiUrl+userId+'/'+channelId,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
