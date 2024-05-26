import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RdvService } from '../services/rdv.service';
import { UserService } from '../services/user.service';
import { Rdv } from '../Models/Rdv.model';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-user-rdv',
  standalone: true,
  templateUrl: './user-rdv.component.html',
  styleUrl: './user-rdv.component.css',
  imports: [FooterComponent, HeaderComponent,FontAwesomeModule],
})
export class UserRdvComponent {

  faClose = faClose;
  faEdit = faEdit;
  id: any;
  rdvList: any[];
  constructor(
    private service: RdvService,
    private userservice: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.userservice.getId();
    this.service.getRdvByUser(this.id).subscribe((data) => {
      this.rdvList = data;
    });
  }
  Annuler(id: string): void {
    if (confirm('Voulez vous supprimer ce rendez-vous ?')) {
      this.service.annulerRdv(id).subscribe(() => {
        
          window.location.reload();
        
      });
    }
  }
}
