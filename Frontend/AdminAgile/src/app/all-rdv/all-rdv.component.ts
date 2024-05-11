import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { MenuComponent } from "../menu/menu.component";
import { Router } from '@angular/router';
import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import { RdvService } from '../services/rdv.service';
import { UserServiceService } from '../services/user-service.service';
import { HeaderComponent } from "../header/header.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-all-rdv',
    standalone: true,
    templateUrl: './all-rdv.component.html',
    styleUrl: './all-rdv.component.css',
    imports: [FooterComponent, MenuComponent, HeaderComponent,FontAwesomeModule]
})
export class AllRdvComponent {
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
    this.service.getAll().subscribe((data) => {
      this.role = this.userservice.getUserRole();

      this.rdvList = data;
    });
  }
  onDelete(id: string): void {
    if (confirm('Voulez vous supprimer ce rendez-vous ?')) {
      this.service.deleteRdv(id).subscribe(() => {
        this.router.navigate(['/AllRdv']).then(() => {
          window.location.reload();
        });
      });
    }
  }
}
