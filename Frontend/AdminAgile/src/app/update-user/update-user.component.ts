import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../Models/User.model';
import { UserServiceService } from '../services/user-service.service';
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-update-user',
  standalone: true,
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
  ],
})
export class UpdateUserComponent implements OnInit {
  OperatorForm: FormGroup;
  user: any;
  user1: any;

  CurrentId: string;
  SameId: any;
  constructor(
    private service: UserServiceService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService,
    private route: ActivatedRoute
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
      role: new FormControl('', [Validators.required]),
    };
    this.OperatorForm = this.fb.group(formControls);
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
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
  UpdateUser() {
    this.route.paramMap.subscribe((params) => {
      var id = params.get('id');

      let data = this.OperatorForm.value;

      console.log(data);
      this.user1 = new User(
        undefined,
        data.nom,
        data.prenom,
        data.email,
        data.tel,
        data.username,
        this.user.password,
        data.role      
        );
      console.log(this.user1);

      if (
        data.nom == 0 ||
        data.prenom == 0 ||
        data.email == 0 ||
        data.tel == 0 ||
        data.username == 0 ||
        data.role == 0
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
    });
  }

  isUpdatingSelf(): boolean {
    return this.CurrentId === this.user?.id;
  }
}
