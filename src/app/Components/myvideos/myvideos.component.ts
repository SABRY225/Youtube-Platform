import { Component } from '@angular/core';
import { CurrentUser, ResultMessage } from '../../Models/user';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VideoService } from '../../Services/video.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';  
import { PlaylistService } from '../../Services/playlist.service';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-myvideos',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule,RouterModule,MatSnackBarModule,FormsModule],
  templateUrl: './myvideos.component.html',
  styleUrl: './myvideos.component.css'
})
export class MyvideosComponent {
  user: CurrentUser = {
    id:'',
    role: '',
    userName: '',
    country: '',
    email: '',
    profilePicture: '',
  };
  video:any[]=[]
  data: ResultMessage = {
    message: '',
    success: false
  };
  constructor(
    private userService: UserService,
    private videoService: VideoService,
    private playlistService: PlaylistService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar  // Inject MatSnackBar
  ) { }
  ngOnInit(): void {
    this.loadUser();
  }
  Playlists:any[]=[]
  profileId:string=''

  // Method to load categories
  loadUser(): void {
    this.profileId=this.route.snapshot.params['userId']
    this.userService.currentUser().subscribe((data) => {
      this.user = data;
      if (this.profileId !==undefined) {
        this.videoService.getMyVideo(this.profileId).subscribe((data) => {
          this.video = data;
        });
        this.playlistService.getMyPlaylist(this.profileId).subscribe((data) => {
          this.Playlists = data;        
        });
      }else{
        this.videoService.getMyVideo(this.user.id).subscribe((data) => {
          this.video = data;
        });
        this.playlistService.getMyPlaylist(this.user.id).subscribe((data) => {
          this.Playlists = data;        
        });
      }

    });
  }
  editVideo(videoId:string){
    this.router.navigate([`/home/editVideo/${videoId}`])
  }
  deleteVideo(videoId:string){
    this.videoService.deleteVideo(videoId).subscribe((data)=>{
      this.data=data
      this.video = this.video.filter(video => video.id !== videoId);
      if (this.data.success) {
        this.openSnackBar(this.data.message, 'Close');  
      } else {
        this.openSnackBar(this.data.message, 'Retry');  // Show failure toast
      }
    })
  }
  assignVideo(playlistId:string){
    this.videoService.assignVideo(this.videoId,playlistId).subscribe((data:any)=>{
      this.data=data
      console.log(data);
    })
  }
  isDisplay: boolean = false;
  videoId:string=''
  openModal(videoId:string) {
    this.videoId=videoId
    const modalElement = document.getElementById('staticBackdrop2');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
  displyAddPlaylist() {
    this.isDisplay = true
  }
  closeDisplay() {
    this.isDisplay = false
  }
  openVideo(videoId:string){
    this.videoService.addView(videoId).subscribe(data=>{
    this.data=data
    this.router.navigate([`/home/video/${videoId}`])
    })
  }
  // Toast notification method
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,  // Duration of the toast (3 seconds)
    });
  }
}
