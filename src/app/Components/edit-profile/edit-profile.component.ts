import { Component } from '@angular/core';
import { Profile, ResultMessage } from '../../Models/user';
import { UserService } from '../../Services/user.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';  

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule],  // Add MatSnackBarModule to imports
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  data: ResultMessage = {
    message: '',
    success: false
  };

  user: Profile = {
    userName: '',
    country: '',
    profilePicture: '',
    dateOfBirth: '',
    backgroundUser: ''
  };
  userUpdate: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar  // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.userService.currentUser().subscribe((data) => {
      this.user = data;
    });
  }

  onSubmit(): void {
    this.userService.updateUser(this.user).subscribe((data) => {
      this.data = data;
      if (this.data.success) {
        this.openSnackBar('Profile updated successfully!', 'Close');  
        // window.location.reload();
        this.router.navigate([`/home/profile`]);
      } else {
        this.openSnackBar('Failed to update profile.', 'Retry');  // Show failure toast
      }
    });
  }
  // Toast notification method
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,  // Duration of the toast (3 seconds)
    });
  }
}
