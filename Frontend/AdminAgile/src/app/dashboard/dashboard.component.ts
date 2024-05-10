import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [FooterComponent, HeaderComponent, MenuComponent],
})
export class DashboardComponent implements OnInit {
    countAdmin = 0;
    countClient = 0;
    countOpertaeur=0;
    Listuser:any[];
    constructor(private service: UserServiceService) {}
    ngOnInit(): void {
        this.service.getUsers().subscribe(data=>{
            this.Listuser=data
            this.Listuser.forEach(user => {
                if (user.role=="admin") {
                    this.countAdmin++;
                } else {
                    if (user.role == 'operator') {
                        this.countOpertaeur++;
                    } else {
                        this.countClient++;
                    }
                }
            });})
    }
}
