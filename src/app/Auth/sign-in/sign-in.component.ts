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
  data: any = {
    Token:'',
    Role:'',
    message: '',
    success:false
  };
  errMessage:string=''
  user: UserLogin = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,private router: Router,
    private route: ActivatedRoute) {}
  
    onSubmit():void {
      this.authService.login(this.user).subscribe((data) => {
        this.data=data
        console.log(this.data);
        if (this.data.success) {
          this.router.navigate([`/home`]);
          localStorage.setItem('token',this.data.Token)
        }else{
         this.errMessage=this.data.message
        }

      });
    }

}
