import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';


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
      tap((res:any)=>localStorage.setItem('myToken',res.access_token)),
    )
  }

  getInfo(){
    let token=localStorage.getItem("myToken")
    let decoded=jwtDecode(token).sub["id"]  }

  //  getInfo(token: string): Observable<any> {

    // const headers = new HttpHeaders().set('Authorization', `Afif ${token}`);
    // const options = { headers };
    // return this.http.get<any>(`${this.apiUrl}/info`,options);
  //}


  isLoggedIn(){
    let token= localStorage.getItem("myToken");
    if (token){
      return true;
    }else{
      return false;
    }
  }
}
