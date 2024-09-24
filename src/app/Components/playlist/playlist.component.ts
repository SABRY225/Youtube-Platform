import { Component } from '@angular/core';
import { PlaylistService } from '../../Services/playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SaveService } from '../../Services/save.service';
import { ResultMessage } from '../../Models/user';
import { ChecksavePlaylist } from '../../Models/category';
import { VideoService } from '../../Services/video.service';
@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [MatSnackBarModule, MatTooltipModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  data: ResultMessage = {
    message: '',
    success: false
  };
  Playlist: any = []
  constructor(
    private playlistService: PlaylistService,
    private saveService: SaveService,
    private videoService: VideoService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar  // Inject MatSnackBar
  ) { }
  ngOnInit(): void {
    this.loadPlaylist();
  }
  playlistId: string = '';
  checksavePlaylist: ChecksavePlaylist = {
    status:''
  };
  // Method to load categories
  loadPlaylist(): void {
    this.playlistId = this.route.snapshot.params['playlistId'];
    this.playlistService.getPlaylist(this.playlistId).subscribe(data => {
      this.Playlist = data
    });
    this.saveService.checkSavePlaylist(this.playlistId).subscribe(data => {
      this.checksavePlaylist = data;
    })
  }
  copied: boolean = false;
  copyUrl() {
    const url = window.location.href; // الحصول على الـ URL الحالي
    const textArea = document.createElement('textarea');
    textArea.value = url;

    // إنشاء textarea غير مرئي ونسخ الـ URL
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    // إظهار رسالة "Copied"
    this.copied = true;
    if (this.copied) {
      this.openSnackBar('copy URL Playlist successfully!', 'Close');
    } else {
      this.openSnackBar('Failed Copy URL Playlist', 'Retry');  // Show failure toast
    }
  }
  openVideo(videoId: string) {
    this.videoService.addView(videoId).subscribe(data=>{
      this.data=data
      this.router.navigate([`/home/video/${videoId}`])
      })
  }
  savePlaylist() {
    this.saveService.savePlaylist(this.playlistId).subscribe(data => {
      this.data = data;
      console.log(data);
      
      if (this.data.success) {
        this.checksavePlaylist.status="saved"
        this.openSnackBar(this.data.message, 'Close');
      } else {
        this.openSnackBar(this.data.message, 'Retry');  // Show failure toast
      }
    })
  }
  deleteSavePlaylist() {
    this.saveService.deleteSavePlaylist(this.playlistId).subscribe(data => {
      this.data = data;
      if (this.data.success) {
        this.openSnackBar(this.data.message, 'Close');
        this.checksavePlaylist.status=''
      } else {
        this.openSnackBar(this.data.message, 'Retry');  
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
