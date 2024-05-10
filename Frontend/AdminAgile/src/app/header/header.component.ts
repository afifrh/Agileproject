import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { User } from '../Models/User.model';
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
  id: string;
  user: User;
  constructor(
    private service: UserServiceService,
    private router: Router,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.id = this.service.getId();
    this.service.getUserById(this.id).subscribe((data) => (this.user = data));
  }
  Logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/LoginAdmin']);
  }
  checkProfile() {
    this.modalService.open(ProfileComponent); // Replace with your modal component reference
  }
}
