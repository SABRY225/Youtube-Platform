import { Component } from '@angular/core';
import { Video } from '../../Models/video';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../../Models/category';
import { VideoService } from '../../Services/video.service';
import { ResultMessage } from '../../Models/user';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent {
  isEdite:boolean=false
  data: ResultMessage = {
    message: '',
    success: false
  };
  video:Video={
    title:'',
    videoUrl:'',
    description:'',
    backImgVideoUrl:''
  }
  categoryId:string='';
  category:any=null
  constructor(
    private categoryService: CategoryService,
    private videoService: VideoService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar  // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }
  loadUser(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.category = data;
    });
    this.videoId= this.route.snapshot.params['videoId'];
    if (this.videoId) {
      this.isEdite=true
      this.videoService.getVideo(this.videoId).subscribe((data) => {
        this.video = data;
        console.log(data);
      });
    }
  }
  videoId:string=''
  onSubmit(){
    this.videoId= this.route.snapshot.params['videoId'];
    console.log(this.videoId);
    if (this.videoId) {
      this.videoService.editVideo(this.video,this.videoId).subscribe((data) => {
        this.data = data;
        if (this.data.success) {
          this.openSnackBar(this.data.message, 'Close');  
          this.router.navigate([`/home/profile`]);
        } else {
          this.openSnackBar('Failed to Update Video.', 'Retry');  // Show failure toast
        }
      });
    }else{
      this.videoService.addVideo(this.video,this.categoryId).subscribe((data) => {
        this.data = data;
        if (this.data.success) {
          this.openSnackBar('Video Add successfully!', 'Close');  
          this.router.navigate([`/home/profile`]);
        } else {
          this.openSnackBar('Failed to Add Video.', 'Retry');  // Show failure toast
        }
      });
    }

  }

    // Toast notification method
    openSnackBar(message: string, action: string): void {
      this.snackBar.open(message, action, {
        duration: 3000,  // Duration of the toast (3 seconds)
      });
    }
}
