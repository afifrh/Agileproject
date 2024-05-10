import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ListOperateurComponent } from './list-operateur/list-operateur.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListRdvComponent } from './list-rdv/list-rdv.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { AddOperatorComponent } from './add-operator/add-operator.component';
import { AddRdvComponent } from './add-rdv/add-rdv.component';

export const routes: Routes = [
    {path:'',component:DashboardComponent},
    {path:'LoginAdmin',component:LoginComponent},
    {path:'ListOperateur',component:ListOperateurComponent},
    {path:'ListClient',component:ListClientComponent},
    {path:'ListRdv',component:ListRdvComponent},
    {path:'ListTicket',component:ListTicketComponent},
    {path:'AddOperator',component:AddOperatorComponent},
    {path:'AddRdv',component:AddRdvComponent}
];
