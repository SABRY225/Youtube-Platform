import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl='http://localhost:3000/api/search/';

  constructor(private http:HttpClient) { }


  searchVideo(content:string): Observable<any> {
    return this.http.get(this.apiUrl+content,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  searchUser(content:string): Observable<any> {
    return this.http.get(this.apiUrl+'users/'+content,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  searchPlaylist(content:string): Observable<any> {
    return this.http.get(this.apiUrl+'playlists/'+content,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
