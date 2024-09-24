import { Component } from '@angular/core';
import { SaveService } from '../../Services/save.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { VideoService } from '../../Services/video.service';
import { ResultMessage } from '../../Models/user';

@Component({
  selector: 'app-your',
  standalone: true,
  imports: [],
  templateUrl: './your.component.html',
  styleUrl: './your.component.css'
})
export class YourComponent {
  videos:any=[]
  playlists:any=[]
  data: ResultMessage = {
    message: '',
    success: false
  };
  constructor(
    private saveService: SaveService,
    private videoService: VideoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.saveService.getMyPlaylists().subscribe(data=>{
      this.playlists=data
    })
    this.saveService.gitMyVideos().subscribe(data=>{
      this.videos=data
      console.log(this.videos);
      
    })
  }
  openPlaylist(playlistId:string){
    this.router.navigate([`/home/playlist/${playlistId}`])
  }
  openVideo(videoId:string){
    this.videoService.addView(videoId).subscribe(data=>{
    this.data=data
    console.log(this.data);
    this.router.navigate([`/home/video/${videoId}`])
    })
  }
}
