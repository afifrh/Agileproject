import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../Models/User.model';

@Component({
    selector: 'app-list-operateur',
    standalone: true,
    templateUrl: './list-operateur.component.html',
    styleUrl: './list-operateur.component.css',
    imports: [MenuComponent, HeaderComponent, FooterComponent]
})
export class ListOperateurComponent implements OnInit {
    role:string
    userList: User[];
    constructor(private service:UserServiceService ,private router:Router){}
    ngOnInit(): void {
        this.role=localStorage.getItem('role')as string;
        this.service.getUsers().subscribe(data=>{
            console.log(data)
            this.userList=data})
    }
    onDelete(id: string):void{
       if (confirm("Voulez vous supprimer ce administrateur ?")) {

      this.service.deleteUser(id).subscribe(() => {
        this.router.navigate(['/ListOperateur']).then(() => {
          window.location.reload()
        })
      })
    }
    }


}