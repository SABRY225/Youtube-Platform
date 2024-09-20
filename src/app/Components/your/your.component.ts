// your.component.ts
import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../Services/your.service';
import { CommonModule } from '@angular/common';
// استيراد الخدمة

@Component({
  selector: 'app-your',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './your.component.html',
  styleUrls: ['./your.component.css']
})
export class YourComponent implements OnInit {
  videos: any[] = [];

  constructor(private videoService: VideoService) {} // استخدام الخدمة في المكون

  ngOnInit() {
    // استخدام الخدمة لجلب البيانات
    this.videoService.getVideos().subscribe({
      next: (response: any) => {
        this.videos = response;
      },
      error: (err) => {
        console.error('Error fetching videos', err);
      }
    });
  }
}
