import { Component } from '@angular/core';
import { SubscriptionUser } from '../../Models/subscription';
import { SubscriptionsService } from '../../Services/subscriptions.service';
import { UserService } from '../../Services/user.service';
import { CurrentUser } from '../../Models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribes',
  standalone: true,
  imports: [],
  templateUrl: './subscribes.component.html',
  styleUrl: './subscribes.component.css'
})
export class SubscribesComponent {
  Subscriptions: any[]=[]
  user: CurrentUser={
    role: '',
    userName: '',
    country: '',
    email: '',
    profilePicture: '',
    id:''
  };
    
    constructor(private SubscriptionsService: SubscriptionsService,private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    this.loadCurrentUSer();

  }
  // Method to load categories
  loadCurrentUSer(): void {
    this.userService.currentUser().subscribe((data) => {
      this.user = data;
      this.SubscriptionsService.getSubscriptions(this.user).subscribe((data) => {
        this.Subscriptions = data;
        console.log(data);
        
      });
    });
  }

  openProfile(userId:string){
      this.router.navigate([`/home/profile/${userId}`])
  }

}
