import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { VideoService } from '../../Services/video.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUser, ResultMessage } from '../../Models/user';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent {
  videos:any=[]
  user: CurrentUser={
    role: '',
    userName: '',
    country: '',
    email: '',
    profilePicture: '',
    id:''
  };
  data: ResultMessage = {
    message: '',
    success: false
  };

  constructor(private userService: UserService,private videoService: VideoService,    
    private  router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadUser();
  }

  // Method to load User
  loadUser(): void {
    this.userService.currentUser().subscribe((data) => {
      this.user = data;
      this.videoService.getVideos().subscribe(
        (data)=>{
          this.videos=data
        }
      )
    });
  }
  openVideo(videoId:string){
    this.videoService.addView(videoId).subscribe(data=>{
    this.data=data
    this.router.navigate([`/home/video/${videoId}`])
    })
  }
}
