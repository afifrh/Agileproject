import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";
import { Ticket } from '../Models/Ticket.model';
import { TicketService } from '../services/ticket.service';

@Component({
    selector: 'app-list-ticket',
    standalone: true,
    templateUrl: './list-ticket.component.html',
    styleUrl: './list-ticket.component.css',
    imports: [FooterComponent, HeaderComponent, MenuComponent]
})
export class ListTicketComponent implements OnInit {
    TicketList:Ticket[]
    constructor(private service: TicketService,) {}
    ngOnInit(): void {
this.service.getTickets().subscribe(data=>{
    this.TicketList= data;
})    }

}
