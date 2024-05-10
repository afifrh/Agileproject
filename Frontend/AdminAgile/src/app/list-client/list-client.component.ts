import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";
import { UserServiceService } from '../services/user-service.service';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { User } from '../Models/User.model';
import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-list-client',
    standalone: true,
    templateUrl: './list-client.component.html',
    styleUrl: './list-client.component.css',
    imports: [FooterComponent, HeaderComponent, MenuComponent,FontAwesomeModule,RouterLink]
})
export class ListClientComponent implements OnInit {
   faClose = faClose;
  faEdit = faEdit;
  userList: User[];
  role: any;
  constructor(private service: UserServiceService, private router: Router) {}
  ngOnInit(): void {
    this.service.getClients().subscribe((data) => {
      this.role = this.service.getUserRole();
      this.userList = data;
    });
  }
  onDelete(id: string): void {
    if (confirm('Voulez vous supprimer ce administrateur ?')) {
      this.service.deleteUser(id).subscribe(() => {
        this.router.navigate(['/ListOperateur']).then(() => {
          window.location.reload();
        });
      });
    }
  }

}
