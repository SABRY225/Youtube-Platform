import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import {ResultMessage, User } from '../../Models/user';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, FooterComponent,FormsModule], 
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  data: ResultMessage = {
    message: '',
    success: false
  };
  
  user: User = {
    userName: '',
    dateOfBirth: '',
    country: '',
    email: '',
    password: ''
  };

    
    constructor(private authService: AuthService,private router: Router,
      private route: ActivatedRoute) {}

  onSubmit():void {
    this.authService.register(this.user).subscribe((data) => {
      this.data=data
      if (this.data.success) {
        this.router.navigate([`/auth/${this.user.email}/verify`]);
      }
      
    });
  }
}
