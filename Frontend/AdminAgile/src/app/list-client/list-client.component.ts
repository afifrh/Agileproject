import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { User } from '../Models/User.model';

@Component({
    selector: 'app-list-client',
    standalone: true,
    templateUrl: './list-client.component.html',
    styleUrl: './list-client.component.css',
    imports: [FooterComponent, HeaderComponent, MenuComponent]
})
export class ListClientComponent implements OnInit {
    role:string;
    userList: User[];
    constructor(private service:UserServiceService ,private router:Router){}
    ngOnInit(): void {
        this.role=localStorage.getItem('role') as string;
        this.service.getUsers().subscribe(data=>
            this.userList=data)
    }
    onDelete(id: string):void{
       if (confirm("Voulez vous supprimer ce administrateur ?")) {

      this.service.deleteUser(id).subscribe(() => {
        this.router.navigate(['/ListAdmin']).then(() => {
          window.location.reload()
        })
      })
    }
    }


}
