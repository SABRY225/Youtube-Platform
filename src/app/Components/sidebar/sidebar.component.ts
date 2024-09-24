import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CurrentUser } from '../../Models/user';
import { UserService } from '../../Services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  user: CurrentUser={
    role: '',
    userName: '',
    country: '',
    email: '',
    profilePicture: '',
    id:''
  };

  constructor(private userService: UserService,
    private  router: Router

  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Method to load categories
  loadCategories(): void {
    this.userService.currentUser().subscribe((data) => {
      this.user = data;
      console.log(this.user);
      
    });
  }

  searchQuery: string = '';

  onSearch() {
      // استخدم searchQuery للبحث عن النتائج المناسبة
      console.log('Searching for:', this.searchQuery);
      this.router.navigate([`/home/${this.searchQuery}`])

      // قم بإضافة منطق البحث هنا
  }

  openHome(){
   this.router.navigate(['/home'])
  }
}
