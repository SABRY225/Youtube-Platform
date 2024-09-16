import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  counts: { userCount: number; videoCount: number; playlistCount: number } = {
    userCount: 0,
    videoCount: 0,
    playlistCount: 0
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchCounts();
  }

  fetchCounts() {
    this.userService.getStats().subscribe(
      (data) => {
        this.counts = data;
  console.log(this.counts);
          
      },
      (error) => {
        console.error('Error fetching counts', error);
        if (error.status === 404) {
          alert('You need to log in to access this data.');
        }
      }
    );
  }

}
