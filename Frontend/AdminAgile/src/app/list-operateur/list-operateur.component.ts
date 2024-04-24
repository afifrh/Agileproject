import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-list-operateur',
    standalone: true,
    templateUrl: './list-operateur.component.html',
    styleUrl: './list-operateur.component.css',
    imports: [MenuComponent, HeaderComponent, FooterComponent]
})
export class ListOperateurComponent {

}
