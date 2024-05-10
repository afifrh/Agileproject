import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../../Models/User.model';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  OperatorForm: FormGroup;
  constructor(
    private service: UserServiceService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService
  ) {
    let formControls = {
      nom: new FormControl('', [Validators.required]),

      prenom: new FormControl('', [Validators.required]),

      email: new FormControl('', [
        Validators.required,
        Validators.required,
        Validators.email,
      ]),
      tel: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    };
    this.OperatorForm = this.fb.group(formControls);
  }
  get nom() {
    return this.OperatorForm.get('nom');
  }
  get prenom() {
    return this.OperatorForm.get('prenom');
  }
  get username() {
    return this.OperatorForm.get('username');
  }
  get tel() {
    return this.OperatorForm.get('tel');
  }
  get email() {
    return this.OperatorForm.get('email');
  }
  get password() {
    return this.OperatorForm.get('password');
  }
  get role() {
    return this.OperatorForm.get('role');
  }
  addNewOperator() {
    let data = this.OperatorForm.value;
    console.log(data);
    let operateur = new User(
      undefined,
      data.nom,
      data.prenom,
      data.email,
      data.tel,
      data.username,
      data.password,
      data.role
    );
    console.log(operateur);

    if (
      data.nom == 0 ||
      data.prenom == 0 ||
      data.email == 0 ||
      data.tel == 0 ||
      data.username == 0 ||
      data.password == 0 ||
      data.role == 0
    ) {
      this.toast.info({
        detail: ' Message d erreur',
        summary: 'Remplir votre champs',
      });
    } else {
      this.service.signup(operateur).subscribe(
        (res) => {
          console.log(res);
          this.toast.success({
            detail: 'Succes Message',
            summary: 'Operator ajoutée',
          });

          this.router.navigate(['/ListOperateur']);
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
