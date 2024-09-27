import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl='https://youtube-platform-api.vercel.app/api/like/';

  constructor(private http:HttpClient) { }

  checkLikeVideo(videoId:string): Observable<any> {
    return this.http.get(this.apiUrl+'check/'+videoId,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }

  getCountsVideo(videoId:string): Observable<any> {
    return this.http.get(this.apiUrl+videoId,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }

  likeVideo(likeData:any): Observable<any> {
    return this.http.post(this.apiUrl,likeData,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }

  deleteLikeVideo(videoId:string): Observable<any> {
    return this.http.delete(this.apiUrl+videoId,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
