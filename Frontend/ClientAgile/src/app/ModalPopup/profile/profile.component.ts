import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../Models/User.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateUserComponent } from '../../update-user/update-user.component';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  id: string;
  faEdit = faEdit;
  user: User;
  constructor(private service: UserService, private modalService: NgbModal) {}
  ngOnInit(): void {
    this.id = this.service.getId();
    this.service.getUserById(this.id).subscribe((data) => (this.user = data));
  }

  OpenForm() {
    this.modalService.open(UpdateUserComponent); // Replace with your modal component reference
  }
}
