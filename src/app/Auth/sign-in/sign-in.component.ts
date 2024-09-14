import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ResultLogin, UserLogin } from '../../Models/user';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, FooterComponent,FormsModule], 
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  data: ResultLogin = {
    Token:'',
    Role:'',
    message: ''
  };
  
  user: UserLogin = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,private router: Router,
    private route: ActivatedRoute) {}
  
    onSubmit():void {
      this.authService.login(this.user).subscribe((data) => {
        this.data=data
        console.log(this.data.Token);
        
        if (this.data.Role=='Admin' || this.data.Role=='User') {
          this.router.navigate([`/home`]);
          localStorage.setItem('token',this.data.Token)
        }
      });
    }

}
