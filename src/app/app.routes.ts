import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { LayoutComponent } from './Auth/layout/layout.component';
import { DashboardComponent } from './Auth/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:'',redirectTo:'Login',pathMatch:'full'
    },
    {
        path:'Login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'Dashboard',
                component:DashboardComponent
            }
        ]
    }
];
