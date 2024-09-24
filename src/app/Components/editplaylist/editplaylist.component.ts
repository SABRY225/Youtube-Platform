import { Component } from '@angular/core';
import { PlaylistService } from '../../Services/playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editplaylist',
  standalone: true,
  imports: [],
  templateUrl: './editplaylist.component.html',
  styleUrl: './editplaylist.component.css'
})
export class EditplaylistComponent {
  Playlist:any=[]
  PlaylistId:string=''
  constructor(
    private playlistService: PlaylistService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar  // Inject MatSnackBar
  ) { }
  ngOnInit(): void {
    this.loadPlaylist();
  }

  // Method to load categories
  loadPlaylist(): void {
      this.PlaylistId=this.route.snapshot.params['playlistId']
      this.playlistService.getPlaylist(this.PlaylistId).subscribe((data) => {
        this.Playlist = data;
        console.log(this.Playlist);
      });
  }

}
