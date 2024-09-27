import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl='https://youtube-platform-api.vercel.app/api/Category/';

  constructor(private http:HttpClient) { }

  getCategories(): Observable<Category> {
    return this.http.get<Category>(this.apiUrl+'categories',{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
