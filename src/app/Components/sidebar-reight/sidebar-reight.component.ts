import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrentUser } from '../../Models/user';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-sidebar-reight',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar-reight.component.html',
  styleUrl: './sidebar-reight.component.css'
})
export class SidebarReightComponent {
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
