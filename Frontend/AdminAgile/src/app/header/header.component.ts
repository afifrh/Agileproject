import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { User } from '../Models/User.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  id:string
  user:User
 constructor(private service:UserServiceService,private router:Router){}
  ngOnInit(): void {
    this.id = this.service.getId();
    this.service.getUserById(this.id).subscribe(data=>
      this.user=data)

  }
  Logout(){
    localStorage.removeItem('token');
    this.router.navigate(["/LoginAdmin"])
  }
}
