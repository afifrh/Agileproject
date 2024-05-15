import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { User } from '../Models/User.model';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:1999';

  constructor(private http: HttpClient) {}

  signup(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
  login(user: any) {
    return this.http
      .post(`${this.apiUrl}/login`, user)
      .pipe(
        tap((res: any) => localStorage.setItem('myToken', res.access_token))
      );
  }

  getUserById(id: string) {
    return this.http.get(`${this.apiUrl + '/admin/clients'}/${id}`);
  }

  getId() {
    let token = localStorage.getItem('myToken');
    let id = jwtDecode(token)['id'];
    return id;
  }
  getUserRole(): string[] | null {
    let token = localStorage.getItem('myToken');
    let role = jwtDecode(token)['role'];
    return role;
  }

  isLoggedIn() {
    let token = localStorage.getItem('myToken');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  updateUser(id: string, user: User) {
    const url = `${this.apiUrl + '/admin/updateclients'}/${id}`;
    return this.http.put<any>(url, user);
  }

  updatePwd(id: string, user: User) {
    const url = `${this.apiUrl + '/admin/clients/resetpassword'}/${id}`;
    return this.http.put<any>(url, user);
  }
 
}
