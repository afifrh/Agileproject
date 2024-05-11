import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RdvService } from '../services/rdv.service';
import { UserService } from '../services/user.service';
import { Rdv } from '../Models/Rdv.model';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-user-rdv',
    standalone: true,
    templateUrl: './user-rdv.component.html',
    styleUrl: './user-rdv.component.css',
    imports: [FooterComponent, HeaderComponent]
})
export class UserRdvComponent {
  id: any;
  rdvList: any[];
  constructor(
    private service: RdvService,
    private userservice: UserService,
  ) {}
  ngOnInit(): void {
    this.id = this.userservice.getId();
    this.service.getRdvByUser(this.id).subscribe((data) => {
      this.rdvList = data;
    });
  }
}
