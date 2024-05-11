import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
role: string
  constructor(private userservice:UserServiceService){

  }
  ngOnInit(): void {

  this.role=this.userservice.getUserRole()


    
  }
}
