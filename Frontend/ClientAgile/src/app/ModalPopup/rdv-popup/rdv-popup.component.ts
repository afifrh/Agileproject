import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Rdv } from '../../Models/Rdv.model';
import { RdvService } from '../../services/rdv.service';
import { jwtDecode } from 'jwt-decode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rdv-popup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './rdv-popup.component.html',
  styleUrl: './rdv-popup.component.css',
})
export class RdvPopupComponent {
  RdvForm: FormGroup;
  token = localStorage.getItem('myToken');
  iduser = jwtDecode(this.token)['id'];
  constructor(
    private service: RdvService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService,
    private modalService: NgbModal
  ) {
    let formControls = {
      date: new FormControl('', [Validators.required]),
      // statut: new FormControl('', [
      //   Validators.required,]),
      numeroTicket: new FormControl('', [Validators.required]),
      montant: new FormControl('', [Validators.required]),
    };
    this.RdvForm = this.fb.group(formControls);
  }
  get date() {
    return this.RdvForm.get('date');
  }
  get numeroTicket() {
    return this.RdvForm.get('numeroTicket  ');
  }
  get montant() {
    return this.RdvForm.get('montant');
  }
  AddRdv() {
    let data = this.RdvForm.value;
    console.log(data);
    let rdv = new Rdv(
      undefined,
      this.iduser,
      data.date,
      'en_attente',
      data.numeroTicket,
      data.montant
    );
    console.log(rdv);

    if (data.date == 0 || data.numeroTicket == 0 || data.montant == 0) {
      this.toast.info({
        detail: ' Message d erreur',
        summary: 'Remplir votre champs',
      });
    } else {
      this.service.addRdv(rdv).subscribe(
        (res) => {
          console.log(res);
this.modalService.dismissAll();
          this.toast.success({
            detail: 'Succes Message',
            summary: 'rendez-vous ajoutée',
          });

          this.router.navigate(['']);
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
  }
}
