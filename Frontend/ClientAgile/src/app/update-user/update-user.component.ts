import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../Models/User.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
  imports: [FooterComponent, HeaderComponent,ReactiveFormsModule],
})
export class UpdateUserComponent {
  UserForm: FormGroup;
  user: any;
  user1: any;

  CurrentId: string;
  SameId: any;
  constructor(
    private service: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService,
    private route: ActivatedRoute
  ) {
    let formControls = {
      nom: new FormControl('', ),

      prenom: new FormControl('', ),

      email: new FormControl('', [
        Validators.required,
        Validators.required,
        Validators.email,
      ]),
      tel: new FormControl('', ),
      username: new FormControl('', ),
    };
    this.UserForm = this.fb.group(formControls);
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      console.log(id);
      this.service.getUserById(id).subscribe((data) => {
        if (id === this.CurrentId) {
          this.SameId = true;
        }

        this.user = data;
        this.CurrentId = this.service.getId();
      });
    });
  }
  get nom() {
    return this.UserForm.get('nom');
  }
  get prenom() {
    return this.UserForm.get('prenom');
  }
  get username() {
    return this.UserForm.get('username');
  }
  get tel() {
    return this.UserForm.get('tel');
  }
  get email() {
    return this.UserForm.get('email');
  }
  get password() {
    return this.UserForm.get('password');
  }
 
  UpdateUser() {
    this.route.paramMap.subscribe((params) => {
      var id = params.get('id');

      let data = this.UserForm.value;

      console.log(data);
      this.user1 = new User(
        undefined,
        data.nom,
        data.prenom,
        data.email,
        data.tel,
        data.username,
        this.user.password,
        "client"      );
      console.log(this.user1);

      if (
        data.nom == 0 ||
        data.prenom == 0 ||
        data.email == 0 ||
        data.tel == 0 ||
        data.username == 0 
      ) {
        this.toast.info({
          detail: ' Message d erreur',
          summary: 'Remplir votre champs',
        });
      } else {
        this.service.updateUser(id, this.user1).subscribe(
          (res) => {
            console.log(res);
            this.toast.success({
              detail: 'Succes Message',
              summary: 'Operator ajoutée',
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
    });
  }

  
}
