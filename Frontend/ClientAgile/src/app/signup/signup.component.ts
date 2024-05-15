import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../Models/User.model';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
OperatorForm: FormGroup
  constructor(private service: UserService, private router: Router, private fb: FormBuilder, private toast: NgToastService) {
    let formControls = {   
        nom: ['', [Validators.required]],

        prenom: ['', [Validators.required]],
      
        email: ['', [Validators.required, Validators.email]],
        tel: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    }
    this.OperatorForm = this.fb.group(formControls)
  }
  get nom() { return this.OperatorForm.get('nom'); }
  get prenom() { return this.OperatorForm.get('prenom'); }
  get username() { return this.OperatorForm.get('username'); }
  get tel() { return this.OperatorForm.get('tel'); }
  get email() { return this.OperatorForm.get('email'); }
  get password() { return this.OperatorForm.get('password'); }
  signUp() {
    let data = this.OperatorForm.value;
    console.log(data);
    let operateur = new User(
      undefined, data.nom, data.prenom, data.email,data.tel,data.username, data.password, "client");
    console.log(operateur);

    if (
      data.nom == 0 ||
      data.prenom == 0 ||
      data.email == 0 ||
      data.tel == 0 ||
      data.username == 0 ||
      data.password == 0 
    ) {
      this.toast.info({
        detail: ' Message d erreur',
        summary: 'Remplir votre champs',
      });
    } else {
      this.service.signup(operateur).subscribe(
        res => {
          console.log(res);
          this.toast.success({
            detail: 'Succes Message',
            summary: 'Operator ajoutée',
          });

          this.router.navigate(['']);
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
