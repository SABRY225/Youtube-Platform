import { Routes } from '@angular/router';
import { AppPageComponent } from './Pages/app-page/app-page.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { SendOTPComponent } from './Auth/send-otp/send-otp.component';
import { VerifyComponent } from './Auth/verify/verify.component';
import { ForgetPasswordComponent } from './Auth/forget-password/forget-password.component';
import { UserComponent } from './Pages/user/user.component';
import { AdminComponent } from './Pages/admin/admin.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component:UserComponent },
    {path:'auth',component:AppPageComponent,children:[
        {path:'',component:SignInComponent},
        {path:'signUp',component:SignUpComponent},
        {path:'sendOTP',component:SendOTPComponent},
        {path:':email/verify',component:VerifyComponent},
        {path:':email/forgetPassword',component:ForgetPasswordComponent},
    ]},

    { path: '**', component: PageNotFoundComponent }, 
];
