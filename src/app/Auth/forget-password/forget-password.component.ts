import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ForgetPassword, ResultMessage } from '../../Models/user';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [RouterModule, FooterComponent,FormsModule], 
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  data: ResultMessage = {
    message: '',
    success: false
  };
  user: ForgetPassword = {
    otp: '',
    email: '',
    newPassword: ''
  };
    
  constructor(private authService: AuthService,private router: Router,
    private route: ActivatedRoute) {}

    onSubmit():void {
    this.user.email= this.route.snapshot.params['email'];
      this.authService.forgetPassword(this.user).subscribe((data) => {
        this.data=data
        if (this.data.success) {
          this.router.navigate([`/auth`]);
        }
      });
    }
}
