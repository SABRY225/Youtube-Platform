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


@Component({
  selector: 'app-video-details',
  standalone: true,
  imports: [MatSnackBarModule, MatTooltipModule],
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {
  video: any = {};
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
  safeVideoUrl!: SafeResourceUrl;  // Property to hold the sanitized URL
  subscribeUserData:SubscribeUserData={
    subscriberID: '',
    subscribedToID: ''
  }
  countsLike:CountsLike={
    countLike:0,
    countDisLike:0
  }
  constructor(
    private userService: UserService,
    private videoService: VideoService,
    private saveService: SaveService,
    private subscriptionsService: SubscriptionsService,
    private likeService: LikeService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar, // Inject MatSnackBar
    private sanitizer: DomSanitizer  // Inject DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadUser();
    
  }

  getYoutubeVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }
  checksaveVideo: ChecksaveVideo = {
    status: ''
  };
  checkSubscription: CheckSubscription = {
    isSubscribe: ''
  }
  checkLike:CheckLike={
    Type:''
  }
  likeData:LikeData={
    Type:'Like',
    videoId:''
  }
  loadUser(): void {
    this.route.params.subscribe(params => {
      this.videoId=params['videoId']


    this.userService.currentUser().subscribe((userData) => {
      this.user = userData;
      this.videoService.getVideo(this.videoId).subscribe((videoData) => {
        this.video = videoData;
        const videoUrl = this.getYoutubeVideoId(this.video.videoUrl);
        if (videoUrl) {
          this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${videoUrl}?autoplay=0`);
        }
        this.subscriptionsService.checkSubscription(this.user.id, this.video.channelId).subscribe(data => {
          this.checkSubscription = data
        })
        this.subscribeUserData.subscriberID= this.user.id,
        this.subscribeUserData.subscribedToID= this.video.channelId
        this.likeService.getCountsVideo(this.videoId).subscribe(data=>{
          this.countsLike=data
        })
        this.likeService.checkLikeVideo(this.videoId).subscribe(data=>{
          this.checkLike=data
        })
      });
    });

    this.saveService.checkSaveVideo(this.videoId).subscribe(data => {
      this.checksaveVideo = data;
      console.log(this.checksaveVideo);
    })
  });

  }
  // save video
  saveVideo() {
    this.saveService.saveVideo(this.videoId).subscribe(data => {
      this.data = data;
      if (this.data.success) {
        this.checksaveVideo.status = "saved"
        this.openSnackBar(this.data.message, 'Close');
      } else {
        this.openSnackBar(this.data.message, 'Retry');  // Show failure toast
      }
    })
  }
  deleteSaveVideo() {
    this.saveService.deleteSaveVideo(this.videoId).subscribe(data => {
      this.data = data;
      if (this.data.success) {
        this.openSnackBar(this.data.message, 'Close');
        this.checksaveVideo.status = 'unsaved'
      } else {
        this.openSnackBar(this.data.message, 'Retry');
      }
    })
  }
  // share
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
      this.openSnackBar('copy URL Video successfully!', 'Close');
    } else {
      this.openSnackBar('Failed Copy URL Video', 'Retry');  // Show failure toast
    }
  }

  // subscribe
  subscribeUser(){
    this.subscriptionsService.subscribe(this.subscribeUserData).subscribe(data=>{
      this.data=data  
      if (this.data.success) {
        this.checkSubscription.isSubscribe = "Subscribed"
        this.openSnackBar(this.data.message, 'Close');
      } else {
        this.openSnackBar(this.data.message, 'Retry');  // Show failure toast
      }
    })
  }

  deleteSubscribeUser(){
    this.subscriptionsService.deleteSubscription(this.subscribeUserData.subscriberID, this.subscribeUserData.subscribedToID).subscribe(data=>{
      this.data=data  
      if (this.data.success) {
        this.checkSubscription.isSubscribe = "Unsubscribed"
        this.openSnackBar(this.data.message, 'Close');
      } else {
        this.openSnackBar(this.data.message, 'Retry');  // Show failure toast
      }
    })
  }

  // like
  likeUser(){
    this.likeData.videoId=this.videoId
    this.likeService.likeVideo(this.likeData).subscribe(data=>{
      this.data=data
      if (this.data.success) {
        this.checkLike.Type='Like'
        this.countsLike.countLike= 1 + this.countsLike.countLike
        this.openSnackBar(this.data.message, 'Close');
      } else {
        this.openSnackBar(this.data.message, 'Retry');  // Show failure toast
      }
    })

  }
  deleteLikeUser(){
    this.likeService.deleteLikeVideo(this.videoId).subscribe(data=>{
      this.data=data
      if (this.data.success) {
        this.checkLike.Type='NoLike'
        this.countsLike.countLike=  this.countsLike.countLike-1
        this.checksaveVideo.status = "saved"
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
