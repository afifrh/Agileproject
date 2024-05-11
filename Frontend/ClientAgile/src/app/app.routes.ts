import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { E404Component } from './e404/e404.component';
import { SignupComponent } from './signup/signup.component';
import { AddRdvComponent } from './add-rdv/add-rdv.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserRdvComponent } from './user-rdv/user-rdv.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  { path: '', component: HomeComponent,  },
  { path: 'Login', component: LoginComponent },
  { path: 'Signup', component: SignupComponent },
  {
    path: 'About',
    component: AboutUsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'Contact',
    component: ContactComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'UserRdv/:id',
    component: UserRdvComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'AddRdv',
    component: AddRdvComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'UpdateProfile/:id',
    component: UpdateUserComponent,
    canActivate: [AuthGuardService],
  },
  { path: '**', component: E404Component },
];
