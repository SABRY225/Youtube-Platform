import { Component } from '@angular/core';
import { VideosComponent } from '../../Components/videos/videos.component';
import { VideoDetailsComponent } from '../../Components/video-details/video-details.component';
import { CommentsComponent } from '../../Components/comments/comments.component';

@Component({
  selector: 'app-video-page',
  standalone: true,
  imports: [VideosComponent,VideoDetailsComponent,CommentsComponent],
  templateUrl: './video-page.component.html',
  styleUrl: './video-page.component.css'
})
export class VideoPageComponent {

}
