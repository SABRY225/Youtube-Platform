import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  private apiUrl='https://youtube-platform-api.vercel.app/api/save/';

  constructor(private http:HttpClient) { }

  getMyPlaylists(): Observable<any> {
    return this.http.get(this.apiUrl+'playlists',{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  gitMyVideos(): Observable<any> {
    return this.http.get(this.apiUrl+'videos',{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }

  checkSavePlaylist(playlistId:string): Observable<any>{
    return this.http.get(this.apiUrl+'playlist/check/'+playlistId,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  savePlaylist(playlistId:string): Observable<any>{
    return this.http.post(this.apiUrl+'playlist/'+playlistId,{},{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  deleteSavePlaylist(playlistId:string): Observable<any>{
    return this.http.delete(this.apiUrl+'playlist/'+playlistId,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }

  checkSaveVideo(videoId:string): Observable<any>{
    return this.http.get(this.apiUrl+'video/check/'+videoId,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  saveVideo(videoId:string): Observable<any>{
    return this.http.post(this.apiUrl+'video/'+videoId,{},{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  deleteSaveVideo(videoId:string): Observable<any>{
    return this.http.delete(this.apiUrl+'video/'+videoId,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }

}
