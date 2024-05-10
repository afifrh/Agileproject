import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";
import { RdvService } from '../services/rdv.service';
import { Rdv } from '../Models/Rdv.model';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-list-rdv',
  standalone: true,
  templateUrl: './list-rdv.component.html',
  styleUrl: './list-rdv.component.css',
  imports: [FooterComponent, HeaderComponent, MenuComponent,FontAwesomeModule,RouterLink],
})
export class ListRdvComponent implements OnInit {
  faClose = faClose;
  faEdit = faEdit;
  role: any;
  rdvList: any[];
  constructor(
    private service: RdvService,
    private userservice: UserServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {

    this.service.getRdv().subscribe((data) => {
      this.role = this.userservice.getUserRole();

      this.rdvList = data;
    });
  }
  onDelete(id: string): void {
    if (confirm('Voulez vous supprimer ce rendez-vous ?')) {
      this.service.deleteRdv(id).subscribe(() => {
        this.router.navigate(['/ListRdv']).then(() => {
          window.location.reload();
        });
      });
    }
  }
}
