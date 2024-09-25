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
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Comment } from '../../Models/comment';
@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MatSnackBarModule, MatTooltipModule,MatMenuModule,MatButtonModule,ReactiveFormsModule,CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  commentData: any = {};
  comment:Comment={
    content:''
  }
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
  commentForm!: FormGroup;

  constructor(
    private userService: UserService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar, // Inject MatSnackBar
    private sanitizer: DomSanitizer , // Inject DomSanitizer
    private router: Router,
    private fb: FormBuilder
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
  this.commentForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(3)]],
  });
  });

  }
  // more comment
  isDown:boolean=false
  showComment(status:string){
    if(status=='Down'){
      this.isDown=true
    }else{
      this.isDown=false
    }
  }
  // add comment
  onSubmit() {
    if (this.commentForm.valid) {
      console.log('Comment Submitted:', this.commentForm.value.content);
      this.comment.content=this.commentForm.value.content
      this.commentService.createComment(this.videoId,this.comment).subscribe(data=>{
        this.data=data
        if (this.data.success) {
          this.openSnackBar(this.data.message, 'Close'); 
          this.commentForm.reset(); 
          this.commentService.getComments(this.videoId).subscribe(data=>{
            this.commentData=data
           })
        } else {
          this.openSnackBar(this.data.message, 'Retry');  // Show failure toast
        }
      })
    } else {
      this.openSnackBar('Form is invalid', 'Retry');  // Show failure toast
    }
  }

  // delete comment

  deleteComment(commentId:string){
    this.commentService.deleteComment(commentId).subscribe(data=>{
      this.data=data
      if (this.data.success) {
        this.openSnackBar(this.data.message, 'Close'); 
        this.commentService.getComments(this.videoId).subscribe(data=>{
          this.commentData=data
         })
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
