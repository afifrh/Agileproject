import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

apiUrl = "http://localhost:1999";

  constructor(private http:HttpClient) {
    
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
}
