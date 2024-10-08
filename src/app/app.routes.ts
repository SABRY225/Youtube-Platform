import { Routes } from '@angular/router';
import { AppPageComponent } from './Pages/app-page/app-page.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { SendOTPComponent } from './Auth/send-otp/send-otp.component';
import { VerifyComponent } from './Auth/verify/verify.component';
import { ForgetPasswordComponent } from './Auth/forget-password/forget-password.component';
import { UserComponent } from './Pages/user/user.component';
import { HomeComponent } from './Components/home/home.component';
import { SubscribesComponent } from './Components/subscribes/subscribes.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { YourComponent } from './Components/your/your.component';
import { UsersComponent } from './Components/users/users.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { VideoComponent } from './Components/video/video.component';
import { PlaylistComponent } from './Components/playlist/playlist.component';
import { VideoPageComponent } from './Pages/video-page/video-page.component';
import { SearchComponent } from './Components/search/search.component';
import { EditplaylistComponent } from './Components/editplaylist/editplaylist.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component:UserComponent ,children:[
        {path:'',component:HomeComponent},
        {path:'subscribes',component:SubscribesComponent},
        {path:'profile',component:ProfileComponent},
        {path:'profile/:userId',component:ProfileComponent},
        {path:'your',component:YourComponent},
        {path:'users',component:UsersComponent},
        {path:'editProfile',component:EditProfileComponent},
        {path:'video',component:VideoComponent},
        {path:'playlist/:playlistId',component:PlaylistComponent},
        {path:'editplaylist/:playlistId',component:EditplaylistComponent},
        {path:'video/:videoId',component:VideoPageComponent},
        {path:'editVideo/:videoId',component:VideoComponent},
        {path:':searchquery',component:SearchComponent},
        { path: '**', component: PageNotFoundComponent }, 
    ]},
    {path:'auth',component:AppPageComponent,children:[
        {path:'',component:SignInComponent},
        {path:'signUp',component:SignUpComponent},
        {path:'sendOTP',component:SendOTPComponent},
        {path:':email/verify',component:VerifyComponent},
        {path:':email/forgetPassword',component:ForgetPasswordComponent},
        { path: '**', component: PageNotFoundComponent }, 
    ]},

    { path: '**', component: PageNotFoundComponent }, 
];
