import { Component } from '@angular/core';
import { CurrentUser, ResultMessage } from '../../Models/user';
import { UserService } from '../../Services/user.service';
import { StatisticsComponent } from '../statistics/statistics.component';
import { VideoService } from '../../Services/video.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StatisticsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
    this.loadCategories();
  }

  // Method to load categories
  loadCategories(): void {
    this.userService.currentUser().subscribe((data) => {
      this.user = data;
      console.log('data',data);
      
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
