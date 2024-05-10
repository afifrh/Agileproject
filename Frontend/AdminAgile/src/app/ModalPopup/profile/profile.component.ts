import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../Models/User.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  id:string
  faEdit = faEdit;
  user:User
constructor(private service:UserServiceService){}
  ngOnInit(): void {
     this.id = this.service.getId();
     this.service.getUserById(this.id).subscribe((data) => (this.user = data));
  }
}
