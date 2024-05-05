import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../Models/User.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    loginForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private service: UserServiceService,
    private router: Router, private toast: NgToastService
  ) {
    let formControls = {
      username: new FormControl('', [
        Validators.required,
        Validators.email

      ]),
      password: new FormControl('', [
        Validators.required,

      ])
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
          localStorage.setItem("role", res.role);

          this.router.navigate(['/Dashboard']);
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





  // ngOnInit(): void {
  //   let isLoggedIn = this.service.isLoggedIn();


  //   if (isLoggedIn) {
  //     this.router.navigate(['/LoginAdmin']);
  //   }

  // }


}


