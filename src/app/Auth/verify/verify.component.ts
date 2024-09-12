import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ResultMessage, VerifyUser } from '../../Models/user';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [RouterModule, FooterComponent,FormsModule], 
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {
  data: ResultMessage = {
    message: '',
    success: false
  };
  
  verifyUser: VerifyUser= {
    email: '',
    otp: ''
   };

    
  constructor(private authService: AuthService,private router: Router,private route: ActivatedRoute) {}

  onSubmit():void {
    this.verifyUser.email= this.route.snapshot.params['email'];
    this.authService.verify(this.verifyUser).subscribe((data) => {
      this.data=data
      if (this.data.success) {
        this.router.navigate([`/auth`]);
      }
    });
  }
}
