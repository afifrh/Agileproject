import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ListOperateurComponent } from './list-operateur/list-operateur.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListRdvComponent } from './list-rdv/list-rdv.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { AddOperatorComponent } from './add-operator/add-operator.component';
import { AddRdvComponent } from './add-rdv/add-rdv.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateRdvComponent } from './update-rdv/update-rdv.component';
import { AllRdvComponent } from './all-rdv/all-rdv.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'LoginAdmin', component: LoginComponent },
  {
    path: 'ListOperateur',
    component: ListOperateurComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'ListClient',
    component: ListClientComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'ListRdv',
    component: ListRdvComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'AllRdv',
    component: AllRdvComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'ListTicket',
    component: ListTicketComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'AddOperator',
    component: AddOperatorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'AddRdv',
    component: AddRdvComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'UpdateUser/:id',
    component: UpdateUserComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'UpdateRdv/:id',
    component: UpdateRdvComponent,
    canActivate: [AuthGuardService],
  },
];
