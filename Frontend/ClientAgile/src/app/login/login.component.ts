import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Models/User.model';
import { UserService } from '../services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 loginForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router, private toast: NgToastService
  ) {
    let formControls = {
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]

      
    }

    this.loginForm = this.fb.group(formControls)
  }

  get username() { return this.loginForm.get('username') }
  get password() { return this.loginForm.get('password') }

  login() {
    let data = this.loginForm.value;
    console.log(data);
    let admin = new User(
      undefined, undefined, undefined,  undefined,undefined,data.username, data.password,undefined);
    console.log(admin);
    if (

      data.username == 0 ||
      data.password == 0
    ) {
      this.toast.info({
        detail: 'Message d erreur',
        summary: 'Remplir votre champs',
      });
    } else {

      this.service.login(admin).subscribe(
        res => {
          console.log(res);
          let token = res.token;
          localStorage.setItem("myToken", token);
          

          this.router.navigate(['/']);
        },
        err => {
          console.log(err);
          this.toast.error({
            detail: 'Message d erreur',
            summary: 'champs incorrecte',
          });

        }
      )

    }
  }


}
