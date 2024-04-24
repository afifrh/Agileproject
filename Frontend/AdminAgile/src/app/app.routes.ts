import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path:'LoginAdmin',component:LoginComponent},
    {path:'Dashboard',component:DashboardComponent},
];
