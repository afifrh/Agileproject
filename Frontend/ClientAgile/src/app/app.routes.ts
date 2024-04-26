import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { E404Component } from './e404/e404.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'Login',component:LoginComponent},
    {path:'Signup',component:SignupComponent},
    {path:'About',component:AboutUsComponent},
    {path:'Contact',component:ContactComponent},
    {path:'**',component:E404Component},

];
