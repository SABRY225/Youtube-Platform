import { Component ,OnInit} from '@angular/core';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users:any[]=[];
  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers():void{
    this.userService.getUsers().subscribe((data)=>{
      this.users=data;
    },
  (error)=>{
    console.error('Error Fetching users',error);
  });
  }
  // removeUser(userId: string): void {
  //   this.userService.deleteUser(userId).subscribe({
  //     next: () => {
  //       console.log('User removed successfully');
  //       // Optionally, refresh the user list or update the UI
  //     },
  //     error: (err) => {
  //       console.error('Error removing user', err);
  //     }
  //   });
  // }
  deleteUser(id:string):void {

    
    this.userService.deleteUser(id).subscribe(
      response => {
        console.log('User deleted successfully', response);
      },
      error => {
        console.error('Error deleting user', error);
        if (error.status === 404) {
          alert('You need to log in to perform this action.');
        }
      }
    );
  }
  calcAge(birthDate:string):number{
    const birth = new Date(birthDate);
    const today = new Date();
    let age =today.getFullYear()-birth.getFullYear();
    const monthDifference=today.getMonth()-birth.getMonth();

   
    return age;
  }

}
