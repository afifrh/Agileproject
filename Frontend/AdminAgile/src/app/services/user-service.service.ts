import { HttpHeaders, HttpClient } from '@angular/common/http';
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
export class UserServiceService {
  apiUrl = 'http://localhost:1999';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/admin/clients');
  }
  getClients(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/admin/clients/role/client');
  }
  getAdminsOperators(): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiUrl + '/admin/clients/role/operator-admin'
    );
  }
  signup(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
  //  data(token:string)
  // {
  //   return this.http.get(`${this.apiUrl}/info/`);

  // }
  login(user: any) {
    return this.http
      .post(`${this.apiUrl}/login`, user)
      .pipe(
        tap((res: any) =>
          localStorage.setItem('access_token', res.access_token)
        )
      );
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
    if (this.getId()) {
      return true;
    } else {
      return false;
    }
  }
  getUserById(id: string) {
    return this.http.get(`${this.apiUrl + '/admin/clients'}/${id}`);
  }
  deleteUser(id: string) {
    const url = `${this.apiUrl + '/admin/clients'}/${id}`;
    return this.http.delete(url, httpOptions);
  }
  // updateUser(id: number, evaluation: User) {
  //   const url = `${this.apiUrl + '/'}/${id}`;
  //   return this.http.put<any>(url, evaluation);
  // }
}
