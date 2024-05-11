import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Rdv } from '../Models/Rdv.model';
import { RdvService } from '../services/rdv.service';

@Component({
  selector: 'app-update-rdv',
  standalone: true,
  templateUrl: './update-rdv.component.html',
  styleUrl: './update-rdv.component.css',
  imports: [FooterComponent, HeaderComponent, MenuComponent,ReactiveFormsModule],
})
export class UpdateRdvComponent implements OnInit {
    RdvForm: FormGroup;
    rdv:any;
    rdv1:any
    isDisabled=false
  constructor(
    private service: RdvService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService,
    private route:ActivatedRoute
  ) {
    let formControls = {
      client: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),

      date: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      statut: new FormControl('', [Validators.required]),
      numeroTicket: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      montant: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
    };
    this.RdvForm = this.fb.group(formControls);
  }
    ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
        let id = params.get('id');
        console.log(id)
        this.service.getRdvById(id).subscribe((data) => {
            this.rdv1 = data;
      });
    }); }
  get client() {
    return this.RdvForm.get('client');
  }
  get date() {
    return this.RdvForm.get('date');
  }
  get statut() {
    return this.RdvForm.get('statut');
  }
  get numeroTicket() {
    return this.RdvForm.get('numeroTicket  ');
  }
  get montant() {
    return this.RdvForm.get('montant');
  }



  UpdateRdv() {
     this.route.paramMap.subscribe((params) => {
      var id = params.get('id');
    let data = this.RdvForm.value;
    console.log(data);
    let rdv = new Rdv(
      undefined,
      this.rdv1.idClient,
      this.rdv1.date,
      data.statut,
      this.rdv1.numeroTicket,
      this.rdv1.montant
    );
    console.log(rdv);

    if (
      data.client == 0 ||
      data.date == 0 ||
      data.numeroTicket == 0 ||
      data.montant == 0
    ) {
      this.toast.info({
        detail: ' Message d erreur',
        summary: 'Remplir votre champs',
      });
    } else {

      this.service.updateRdv(id,rdv).subscribe(
        (res) => {
          console.log(res);
          this.toast.success({
            detail: 'Succes Message',
            summary: 'Operator ajoutée',
          });

          this.router.navigate(['/ListRdv']);
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error Message',
            summary: 'Probléme de Serveur',
          });
        }
      );
    }
  })}
}

