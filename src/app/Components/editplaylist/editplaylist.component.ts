import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../Services/playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';  // استيراد FormArray
import { CommonModule } from '@angular/common';
import { ResultMessage } from '../../Models/user';

@Component({
  selector: 'app-editplaylist',
  standalone: true,
  templateUrl: './editplaylist.component.html',
  styleUrls: ['./editplaylist.component.css'],
  imports: [ReactiveFormsModule,CommonModule]
})
export class EditplaylistComponent implements OnInit {
  playlistForm!: FormGroup;
  PlaylistId: string = '';
  data: ResultMessage = {
    message: '',
    success: false
  };
  constructor(
    private playlistService: PlaylistService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.PlaylistId = this.route.snapshot.params['playlistId'];
    this.initializeForm();
    this.loadPlaylist();
  }

  // Initialize form
  initializeForm(): void {
    this.playlistForm = this.fb.group({
      name: ['', Validators.required],
      videos: this.fb.array([])  // FormArray to handle the videos
    });
  }

  // Load playlist and patch the form
  loadPlaylist(): void {
    this.playlistService.getPlaylist(this.PlaylistId).subscribe((data) => {
      this.playlistForm.patchValue({
        name: data.name
      });
      this.setVideos(data.videos);  // Setting videos in the form
    });
  }

  // Populate the videos in FormArray
  setVideos(videos: any[]): void {
    const videoArray = this.playlistForm.get('videos') as FormArray;
    videos.forEach(video => {
      videoArray.push(this.fb.group({
        id: [video.id],
        title: [video.title],
        views: [video.views],
        backImgVideoUrl: [video.backImgVideoUrl]
      }));
    });
  }

  // Remove video from FormArray
  removeVideo(index: number): void {
    const videoArray = this.playlistForm.get('videos') as FormArray;
    videoArray.removeAt(index);
    console.log('videoArray',videoArray);
    
  }

  // Submit the form
  onSubmit(): void {
    const result = {
      name: this.playlistForm.value.name,
      videosId: this.playlistForm.value.videos.map((video:any) => video.id)
    };
    if (this.playlistForm.valid) {
      this.playlistService.editPlaylist(this.PlaylistId, result).subscribe((data) =>
        {
          this.data=data
        if(this.data.success){
          this.snackBar.open(this.data.message, 'Close', { duration: 3000 });
          this.router.navigate([`/home/playlist/${this.PlaylistId}`]);
        }
        else{
          this.snackBar.open(this.data.message, 'Close', { duration: 3000 });
        }
      });
    }
  }
}
