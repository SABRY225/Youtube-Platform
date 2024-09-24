import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from '../Models/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private apiUrl='http://localhost:3000/api/playlist/';

  constructor(private http:HttpClient) { }


  addPlaylist(playlist:Playlist): Observable<any> {
    return this.http.post(this.apiUrl,playlist,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  getMyPlaylist(userId:string): Observable<any> {
    return this.http.get(this.apiUrl+'playlistsByImgVideo/'+userId,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  
  getPlaylist(playlistId:string): Observable<any> {
    return this.http.get(this.apiUrl+playlistId,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }

  deletePlaylist(playlistId:string): Observable<any> {
    return this.http.delete(this.apiUrl+playlistId,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }

  editPlaylist(playlistId:string,playlist:any): Observable<any> {
    return this.http.put(this.apiUrl+playlistId,playlist,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
