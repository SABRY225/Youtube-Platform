import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { VideoService } from '../../Services/video.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';  
import { CurrentUser, ResultMessage } from '../../Models/user';
import { PlaylistService } from '../../Services/playlist.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-myplaylist',
  standalone: true,
  imports: [MatButtonModule,MatMenuModule,RouterModule,MatSnackBarModule],
  templateUrl: './myplaylist.component.html',
  styleUrl: './myplaylist.component.css'
})
export class MyplaylistComponent {
  user: CurrentUser = {
    id:'',
    role: '',
    userName: '',
    country: '',
    email: '',
    profilePicture: '',
  };
  Playlist:any[]=[]
  data: ResultMessage = {
    message: '',
    success: false
  };
  constructor(
    private userService: UserService,
    private playlistService: PlaylistService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar  // Inject MatSnackBar
  ) { }
  ngOnInit(): void {
    this.loadUser();
  }

  // Method to load categories
  loadUser(): void {
    this.userService.currentUser().subscribe((data) => {
      this.user = data;
      this.playlistService.getMyPlaylist(this.user.id).subscribe((data) => {
        this.Playlist = data;
        console.log(this.Playlist);
        
      });
    });
  }

  deleteVideo(playlistId:string){
    this.playlistService.deletePlaylist(playlistId).subscribe((data)=>{
      this.data=data
      this.Playlist = this.Playlist.filter(playlist => playlist.id !== playlistId);
      if (this.data.success) {
        this.openSnackBar(this.data.message, 'Close');  
      } else {
        this.openSnackBar(this.data.message, 'Retry');  // Show failure toast
      }
    })
  }
    // Toast notification method
    openSnackBar(message: string, action: string): void {
      this.snackBar.open(message, action, {
        duration: 3000,  // Duration of the toast (3 seconds)
      });
    }
}
