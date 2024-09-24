import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Profile, ResultMessage } from '../../Models/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaylistService } from '../../Services/playlist.service';
import { Playlist } from '../../Models/playlist';
import { MyplaylistComponent } from '../myplaylist/myplaylist.component';
import { MyvideosComponent } from '../myvideos/myvideos.component';
declare var bootstrap: any;
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, FormsModule,MyplaylistComponent,MyvideosComponent,MatTooltipModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  isDisplay: boolean = false;
  user: Profile = {
    userName: '',
    country: '',
    profilePicture: '',
    dateOfBirth: '',
    backgroundUser: ''
  };
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
    });
  }
  openModal() {
    const modalElement = document.getElementById('staticBackdrop');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
  displyAddPlaylist() {
    this.isDisplay = true
  }
  closeDisplay() {
    this.isDisplay = false
  }

  playlist: Playlist = {
    name:''
  };
  mass:string=''
  colorText:string=''
  onSubmit(): void {
    if (this.playlist.name) {
      console.log(this.playlist);
      this.playlistService.addPlaylist(this.playlist).subscribe((data) => {
        this.data = data;
        if (this.data.success) {
          this.mass='PlayList Add successfully!'
          this.colorText='green'
        } else {
          this.mass='Failed to Add PlayList.'
          this.colorText='red'
        }
      });
    }
  }
  isDisplayScreen:boolean=false
  colorBtnVideo:string='#17202a'
  colorBtnPlaylist:string='#ccd1d1'
  displayPlaylist(){
    this.isDisplayScreen=true
    this.colorBtnPlaylist='#17202a'
    this.colorBtnVideo='#ccd1d1'
  }
  displayVideo(){
    this.isDisplayScreen=false
    this.colorBtnPlaylist='#ccd1d1'
    this.colorBtnVideo='#17202a'

  }
  // Toast notification method
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,  // Duration of the toast (3 seconds)
    });
  }
}
