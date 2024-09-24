import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, FooterComponent,ReactiveFormsModule,CommonModule ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  data: any = {
    message: '',
    success: false,
    type: ''
  };
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder // FormBuilder لإنشاء النموذج
  ) {
    // إعداد النموذج مع validators
    this.signUpForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      country: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.authService.register(this.signUpForm.value).subscribe((data: any) => {
        this.data = data;
        if (this.data.success) {
          this.router.navigate([`/auth/${this.signUpForm.value.email}/verify`]);
        } else {
          this.errorMessage = this.data.message;
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}
