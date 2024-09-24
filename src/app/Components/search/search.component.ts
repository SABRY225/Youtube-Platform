import { Component } from '@angular/core';
import { SearchService } from '../../Services/search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchquery:string=''
  videos:any=[]
  playlists:any=[]
  users:any=[]
  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadSearchVideo();
  }

  loadSearchVideo(): void {
    this.searchquery= this.route.snapshot.params['searchquery'];
    this.searchService.searchVideo(this.searchquery).subscribe(data=>{
      this.videos=data
    })
  }
  isDisplayUserScreen:boolean=false
  isDisplayVideoScreen:boolean=true
  isDisplayPlaylistScreen:boolean=false
  colorBtnVideo:string='#17202a'
  colorBtnPlaylist:string='#ccd1d1'
  colorBtnUser:string='#ccd1d1'
  displayPlaylist(){
    this.isDisplayPlaylistScreen=true
    this.isDisplayUserScreen=false
    this.isDisplayVideoScreen=false
    this.colorBtnPlaylist='#17202a'
    this.colorBtnVideo='#ccd1d1'
    this.colorBtnUser='#ccd1d1'
    this.searchquery= this.route.snapshot.params['searchquery'];
    this.searchService.searchPlaylist(this.searchquery).subscribe(data=>{
      this.playlists=data
    })

  }
  displayVideo(){
    this.isDisplayVideoScreen=true
    this.isDisplayUserScreen=false
    this.isDisplayPlaylistScreen=false
    this.colorBtnPlaylist='#ccd1d1'
    this.colorBtnUser='#ccd1d1'
    this.colorBtnVideo='#17202a'
    this.searchquery= this.route.snapshot.params['searchquery'];
    this.searchService.searchVideo(this.searchquery).subscribe(data=>{
      this.videos=data
    })
  }
  displayUser(){
    this.isDisplayPlaylistScreen=false
    this.isDisplayVideoScreen=false
    this.isDisplayUserScreen=true
    this.colorBtnUser='#17202a'
    this.colorBtnPlaylist='#ccd1d1'
    this.colorBtnVideo='#ccd1d1'
    this.searchquery= this.route.snapshot.params['searchquery'];
    this.searchService.searchUser(this.searchquery).subscribe(data=>{
      this.users=data
      console.log(this.users);
      
    })
  }
  openVideo(videoId:string){
    this.router.navigate([`/home/video/${videoId}`])
  }
  openUser(userId:string){
    this.router.navigate([`/home/profile/${userId}`])
  }
  openPlaylist(playlistId:string){
    this.router.navigate([`/home/playlist/${playlistId}`])
  }
}
