import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../Models/User.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-updatepwd',
  standalone: true,
  templateUrl: './updatepwd.component.html',
  styleUrl: './updatepwd.component.css',
  imports: [FooterComponent, HeaderComponent,ReactiveFormsModule],
})
export class UpdatepwdComponent {
  UserForm: FormGroup;
  user: any;
  user1: any;

  constructor(
    private service: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService,
    private route: ActivatedRoute
  ) {
    let formControls = {
      password: new FormControl(''),


      
    };
    this.UserForm = this.fb.group(formControls);
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      this.service.getUserById(id).subscribe((data) => {
        

        this.user = data;
      });
    });
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
        this.user.nom,
        this.user.prenom,
        this.user.email,
        this.user.tel,
        this.user.username,
        data.password,
this.user.role      );
      console.log(this.user1);

      if (
        data.password == 0 
        
      ) {
        this.toast.info({
          detail: ' Message d erreur',
          summary: 'Remplir votre champs',
        });
      } else {
        this.service.updatePwd(id, this.user1).subscribe(
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
