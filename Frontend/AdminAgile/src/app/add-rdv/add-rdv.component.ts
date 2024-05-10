import { Component } from '@angular/core';
import { RdvService } from '../services/rdv.service';
import { Rdv } from '../Models/Rdv.model';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";

@Component({
    selector: 'app-add-rdv',
    standalone: true,
    templateUrl: './add-rdv.component.html',
    styleUrl: './add-rdv.component.css',
    imports: [FooterComponent, HeaderComponent, MenuComponent,ReactiveFormsModule]
})
export class AddRdvComponent {
RdvForm: FormGroup

  constructor(private service: RdvService, private router: Router, private fb: FormBuilder, private toast: NgToastService) {
    let formControls = {
      client: new FormControl('', [
        Validators.required,]),

      date: new FormControl('', [
        Validators.required,]), 
      // statut: new FormControl('', [
      //   Validators.required,]),
        numeroTicket: new FormControl('', [
        Validators.required,]),
      montant: new FormControl('', [
        Validators.required,]),
      
    }
    this.RdvForm = this.fb.group(formControls)
  }
  get client() { return this.RdvForm.get('client'); }
  get date() { return this.RdvForm.get('date'); }
  get statut() { return this.RdvForm.get('statut'); }
  get numeroTicket  () { return this.RdvForm.get('numeroTicket  '); }
  get montant() { return this.RdvForm.get('montant'); }
  addNewRdv() {
    let data = this.RdvForm.value;
    console.log(data);
    let rdv = new Rdv(
      undefined, data.client, data.date,'en_attente',data.numeroTicket , data.montant);
    console.log(rdv);

    if (
       data.client == 0 ||
      data.date == 0 ||
      data.numeroTicket  == 0 ||
       data.montant == 0
    ) {
      this.toast.info({
        detail: ' Message d erreur',
        summary: 'Remplir votre champs',
      });
    } else {
      this.service.addRdv(rdv).subscribe(
        res => {
          console.log(res);
          this.toast.success({
            detail: 'Succes Message',
            summary: 'Operator ajoutée',
          });

          this.router.navigate(['/ListRdv']);
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
