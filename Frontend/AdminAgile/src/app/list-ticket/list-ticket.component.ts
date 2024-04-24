import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";

@Component({
    selector: 'app-list-ticket',
    standalone: true,
    templateUrl: './list-ticket.component.html',
    styleUrl: './list-ticket.component.css',
    imports: [FooterComponent, HeaderComponent, MenuComponent]
})
export class ListTicketComponent {

}
