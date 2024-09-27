import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl='https://youtube-platform-api.vercel.app/api/comment/';

  constructor(private http:HttpClient) { }

  getComments(videoId:string): Observable<any> {
    return this.http.get(this.apiUrl+videoId,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  createComment(videoId:string,content:any): Observable<any> {
    return this.http.post(this.apiUrl+videoId,content,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  editeComment(commentId:string,content:any): Observable<any> {
    return this.http.put(this.apiUrl+commentId,content,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
  deleteComment(commentId:string): Observable<any> {
    return this.http.delete(this.apiUrl+commentId,{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
