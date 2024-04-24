import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";

@Component({
    selector: 'app-list-client',
    standalone: true,
    templateUrl: './list-client.component.html',
    styleUrl: './list-client.component.css',
    imports: [FooterComponent, HeaderComponent, MenuComponent]
})
export class ListClientComponent {

}
