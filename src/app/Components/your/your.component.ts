import { Component } from '@angular/core';
import { SaveService } from '../../Services/save.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-your',
  standalone: true,
  imports: [],
  templateUrl: './your.component.html',
  styleUrl: './your.component.css'
})
export class YourComponent {
  videos:any=[]
  playlists:any=[]
  constructor(
    private saveService: SaveService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.saveService.getMyPlaylists().subscribe(data=>{
      this.playlists=data
    })
    this.saveService.gitMyVideos().subscribe(data=>{
      this.videos=data
    })
  }
}
