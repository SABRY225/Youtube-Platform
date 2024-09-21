import { Component } from '@angular/core';
import { CurrentUser, ResultMessage, User } from '../../Models/user';
import { UserService } from '../../Services/user.service';
declare var bootstrap: any; 
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: CurrentUser[]=[];
  massg: ResultMessage ={
    message: '',
    success: false
  }
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Method to load categories
  loadCategories(): void {
    this.userService.getUsers().subscribe((data) => this.users = data);
  }
  selectedUser: any=null;

  openModal(user: any) {
    this.selectedUser = user;  // Set selected user
    console.log(user);
    const modalElement = document.getElementById('staticBackdrop');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
  removeUser() {
    this.userService.deleteUser(this.selectedUser).subscribe((data) => {
      this.massg = data;
      console.log(this.massg);
      if (this.massg.success) {
        this.users = this.users.filter(user => user !== this.selectedUser);
        this.selectedUser = null;
        const modalElement = document.getElementById('staticBackdrop');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      }
    });

  }
}
