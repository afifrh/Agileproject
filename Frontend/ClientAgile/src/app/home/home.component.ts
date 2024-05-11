import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isLoggedin=false

  ngOnInit(): void {

    this.isLoggedIn();
  }

  isLoggedIn() {
    let token = localStorage.getItem('myToken');
    if (token) {
      this.isLoggedin = true;

    } else {
      this.isLoggedin = false;
    }
  }
}
