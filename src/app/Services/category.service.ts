import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl='http://localhost:3000/api/Category/';

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
