import { Component } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../Models/Ticket.model';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";

@Component({
    selector: 'app-add-ticket',
    standalone: true,
    templateUrl: './add-ticket.component.html',
    styleUrl: './add-ticket.component.css',
    imports: [FooterComponent, HeaderComponent, MenuComponent,ReactiveFormsModule]
})
export class AddTicketComponent {
TicketForm: FormGroup
  constructor(private service: TicketService, private router: Router, private fb: FormBuilder, private toast: NgToastService) {
    let formControls = {
      client: new FormControl('', [
        Validators.required,]),

      rdv: new FormControl('', [
        Validators.required,]),
      
      
      
    }
    this.TicketForm = this.fb.group(formControls)
  }
  get client() { return this.TicketForm.get('client'); }
  get rdv() { return this.TicketForm.get('rdv'); }
  
  addNewTicket() {
    let data = this.TicketForm.value;
    console.log(data);
    let ticket = new Ticket(
      undefined, data.client, data.rdv);
    console.log(ticket);

    if (
       data.client == 0 ||
      data.rdv == 0 
    ) {
      this.toast.info({
        detail: ' Message d erreur',
        summary: 'Remplir votre champs',
      });
    } else {
      this.service.addTicket(ticket).subscribe(
        res => {
          console.log(res);
          this.toast.success({
            detail: 'Succes Message',
            summary: 'Operator ajoutée',
          });

          this.router.navigate(['/ListTicket']);
        },
        err => {
          console.log(err);
          this.toast.error({
            detail: 'Error Message',
            summary: 'Probléme de Serveur',
          });
        }
      )

    }
  }


}
