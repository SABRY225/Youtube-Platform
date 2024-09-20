
// video.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // هذا يعني أن الخدمة ستكون متاحة في جميع أجزاء التطبيق
})
export class VideoService {
  private API_URL = 'https://youtubeplatformapi-production.up.railway.app/api/save/videos';

  constructor(private http: HttpClient) {}

  getVideos(): Observable<any> {
    // استرجاع التوكن من localStorage
    const token = localStorage.getItem('token');
    
    // إعداد الهيدرز لتضمين التوكن
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // إرسال طلب HTTP GET مع الهيدرز
    return this.http.get(this.API_URL, { headers });
  }
}
