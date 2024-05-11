import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Rdv } from "../Models/Rdv.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class RdvService {
  apiUrl = 'http://localhost:1999';

  constructor(private http: HttpClient) {}

  getRdv(): Observable<Rdv[]> {
    return this.http.get<Rdv[]>(this.apiUrl + '/Operator/AllRdv');
  }
  addRdv(rdv: any) {
    return this.http.post(`${this.apiUrl}/client/rendezvous`, rdv);
  }
  getRdvByUser(id: string): Observable<Rdv[]> {
    return this.http.get<Rdv[]>(
      `${this.apiUrl + '/client/rendezvous'}/${id}`
    );
  }
}
