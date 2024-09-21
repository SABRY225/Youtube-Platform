import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from '../Models/playlist';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  private apiUrl='http://localhost:3000/api/save/';

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

}
