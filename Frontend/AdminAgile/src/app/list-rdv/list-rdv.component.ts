import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";
import { RdvService } from '../services/rdv.service';
import { Rdv } from '../Models/Rdv.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-rdv',
    standalone: true,
    templateUrl: './list-rdv.component.html',
    styleUrl: './list-rdv.component.css',
    imports: [FooterComponent, HeaderComponent, MenuComponent]
})
export class ListRdvComponent implements OnInit {
    role:string
    rdvList:any[]
    constructor(private service: RdvService,private router:Router) {}
    ngOnInit(): void {
        this.role=localStorage.getItem('role')as string;
        
        this.service.getRdv().subscribe(data=>{
            this.rdvList=data
            console.log(data)
        })
    }
    onDelete(id: string):void{
       if (confirm("Voulez vous supprimer ce administrateur ?")) {

      this.service.deleteRdv(id).subscribe(() => {
        this.router.navigate(['/ListRdv']).then(() => {
          window.location.reload()
        })
      })
    }


    }
    
}
