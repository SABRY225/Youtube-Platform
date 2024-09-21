import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../Models/video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl='http://localhost:3000/api/video/';

  constructor(private http:HttpClient) { }

  addVideo(video:Video,categoryId:string): Observable<any> {
    return this.http.post(this.apiUrl+categoryId,video,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  getMyVideo(userId:string): Observable<any> {
    return this.http.get(this.apiUrl+`videos/${userId}`,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }

  getVideo(videoId:string): Observable<any> {
    return this.http.get(this.apiUrl+videoId,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }

  getVideos(): Observable<any> {
    return this.http.get(this.apiUrl,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  editVideo(video:Video,videoID:string): Observable<any>{
    return this.http.put(this.apiUrl+videoID,video,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  deleteVideo(videoID:string):Observable<any>{
    return this.http.delete(this.apiUrl+videoID,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  assignVideo(videoID:string,playlistID:string):Observable<any>{
    return this.http.post(this.apiUrl+playlistID+'/'+videoID,{},{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}
