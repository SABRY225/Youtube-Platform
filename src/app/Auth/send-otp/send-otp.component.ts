import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MessageOTP, ResultMessage, SendOTPDate } from '../../Models/user';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-send-otp',
  standalone: true,
  imports: [RouterModule, FooterComponent,FormsModule], 
  templateUrl: './send-otp.component.html',
  styleUrl: './send-otp.component.css'
})
export class SendOTPComponent {
  data: ResultMessage = {
    message: '',
    success: false
  };
  otpDate: SendOTPDate = {
    email: ''
  };

     
  constructor(private authService: AuthService,private router: Router,
    private route: ActivatedRoute) {}

    onSubmit():void {
      this.authService.sendOTP(this.otpDate).subscribe((data) => {
        this.data=data
        if (this.data.success) {
          this.router.navigate([`/auth/${this.otpDate.email}/forgetPassword`]);
        }
      });
    }
}
