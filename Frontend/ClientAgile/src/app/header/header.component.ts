import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isLoggedin = false;
constructor(private router:Router){}
  ngOnInit(): void {
  this.isLoggedIn()  }
  
  isLoggedIn() {
    let token = localStorage.getItem('myToken');
    if (token) {
      this.isLoggedin = true;
    } else {
      this.isLoggedin = false;
    }
  }


  Logout(){
    localStorage.removeItem("myToken")
    this.router.navigate["/Login"]
  }
}
