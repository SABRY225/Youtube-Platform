import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppPageComponent } from './Pages/app-page/app-page.component';
// import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AppPageComponent,HttpClientModule  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Youtube-Clone';
}
