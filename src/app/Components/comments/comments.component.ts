import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../Services/video.service';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUser, ResultMessage } from '../../Models/user';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SaveService } from '../../Services/save.service';
import { ChecksaveVideo } from '../../Models/category';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SubscriptionsService } from '../../Services/subscriptions.service';
import { CheckSubscription, SubscribeUserData } from '../../Models/subscription';
import { LikeService } from '../../Services/like.service';
import { CheckLike, CountsLike, LikeData } from '../../Models/like';
import { CommentService } from '../../Services/comment.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MatSnackBarModule, MatTooltipModule,MatMenuModule,MatButtonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  commentData: any = {};
  data: ResultMessage = {
    message: '',
    success: false
  };
  user: CurrentUser = {
    role: '',
    userName: '',
    country: '',
    email: '',
    profilePicture: '',
    id: ''
  };
  videoId: string = '';
  isEdit:boolean=false

  constructor(
    private userService: UserService,
    private videoService: VideoService,
    private saveService: SaveService,
    private commentService: CommentService,
    private likeService: LikeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar, // Inject MatSnackBar
    private sanitizer: DomSanitizer  // Inject DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadUser();
    
  }

  loadUser(): void {
    this.route.params.subscribe(params => {
      this.videoId=params['videoId']


    this.userService.currentUser().subscribe((userData) => {
      this.user = userData;
    this.commentService.getComments(this.videoId).subscribe(data=>{
     this.commentData=data
    })
  });
    


  });

  }
}
