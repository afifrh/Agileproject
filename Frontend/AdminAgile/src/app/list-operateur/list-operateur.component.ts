import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../Models/User.model';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-operateur',
  standalone: true,
  templateUrl: './list-operateur.component.html',
  styleUrl: './list-operateur.component.css',
  imports: [MenuComponent, HeaderComponent, FooterComponent, FontAwesomeModule,RouterLink],
})
export class ListOperateurComponent implements OnInit {
  faClose = faClose;
  faEdit = faEdit;
  userList: User[];
  role: any;
  constructor(private service: UserServiceService, private router: Router) {}
  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
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