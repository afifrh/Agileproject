import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { User } from '../Models/User.model';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})


export class UserServiceService {
  apiUrl = "http://localhost:1999";

  constructor(private http:HttpClient) {
    
   }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + "/admin/clients");
  }
  signup(user:any)
  {
    return this.http.post(`${this.apiUrl}/register`,user);

  }
  login(user:any)
  {
    return this.http.post(`${this.apiUrl}/login`,user).pipe(
      tap((res:any)=>localStorage.setItem('access_token',res.access_token)),
    )

  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  getUserRole(): string[] | null {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    console.log("User Roles:", decodedToken.roles);
    return decodedToken.roles;
  }
  isLoggedIn() {


    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  deleteUser(id: string) {
    const url = `${this.apiUrl + "/clients/:clientId"}/${id}`
    return this.http.delete(url, httpOptions)
  }
}
