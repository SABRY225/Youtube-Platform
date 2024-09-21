import { Component } from '@angular/core';
import { CountsOfStatistics } from '../../Models/user';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  countsOfStatistics: CountsOfStatistics={
    userCount:'',
    videoCount:'',
    playlistCount: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Method to load categories
  loadCategories(): void {
    this.userService.CountsOfStatistics().subscribe((data) => {
      this.countsOfStatistics = data;
      console.log(this.countsOfStatistics);
    });
  }
}
