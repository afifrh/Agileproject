import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from '../ModalPopup/profile/profile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isLoggedin = false;
  constructor(private router: Router, private modalService: NgbModal) {}
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

  Logout() {
    localStorage.removeItem('myToken');
    this.router.navigate['/Login'];
  }
  openProfile() {
    this.modalService.open(ProfileComponent); // Replace with your modal component reference
  }
}
