import { Component } from '@angular/core';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SidebarReightComponent } from '../../Components/sidebar-reight/sidebar-reight.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SidebarComponent,RouterModule,SidebarReightComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
