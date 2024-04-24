import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";

@Component({
    selector: 'app-list-rdv',
    standalone: true,
    templateUrl: './list-rdv.component.html',
    styleUrl: './list-rdv.component.css',
    imports: [FooterComponent, HeaderComponent, MenuComponent]
})
export class ListRdvComponent {

}
