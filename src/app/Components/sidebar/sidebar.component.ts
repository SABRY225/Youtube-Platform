import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrentUser } from '../../Models/user';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  user: CurrentUser={
    role: '',
    userName: '',
    country: '',
    email: '',
    profilePicture: '',
    id:''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Method to load categories
  loadCategories(): void {
    this.userService.currentUser().subscribe((data) => {
      this.user = data;
      console.log(this.user);
      
    });
  }
}
