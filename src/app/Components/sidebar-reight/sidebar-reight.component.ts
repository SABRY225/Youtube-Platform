import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CurrentUser } from '../../Models/user';
import { UserService } from '../../Services/user.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidebar-reight',
  standalone: true,
  imports: [RouterModule,MatTooltipModule],
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

  constructor(private userService: UserService,
    private router: Router,

  ) {}

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
  logOut():void{
    localStorage.clear()
  }
  activeLink: string = 'home'; // To store the active link
   // Method to handle active link
   setActive(link: string): void {
    this.activeLink = link;
    if (link=='/') {
    this.router.navigate([`/auth`])
    }
    if (link=='home') {
    this.router.navigate([`/${link}`])
    }else{
      this.router.navigate([`/home/${link}`])
    }
  }
}
