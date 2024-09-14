import { Component } from '@angular/core';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SidebarReightComponent } from '../../Components/sidebar-reight/sidebar-reight.component';
import { CurrentUser, User } from '../../Models/user';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SidebarComponent,RouterModule,SidebarReightComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
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
    });
  }
}
