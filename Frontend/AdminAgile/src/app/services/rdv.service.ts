import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rdv } from '../Models/Rdv.model';
import { Observable } from 'rxjs';

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
    return this.http.get<Rdv[]>(this.apiUrl + '/operator/rendezvous');
  }
  getAll(): Observable<Rdv[]> {
    return this.http.get<Rdv[]>(this.apiUrl + '/operator/AllRdv');
  }
  addRdv(rdv: any) {
    return this.http.post(`${this.apiUrl}/client/rendezvous`, rdv);
  }
  deleteRdv(id: string) {
    const url = `${this.apiUrl + '/client/rendezvous'}/${id}`;
    return this.http.delete(url, httpOptions);
  }
  updateRdv(id: string, rdv: any) {
    const url = `${this.apiUrl + '/client/rendezvous'}/${id}`;
    return this.http.put<any>(url, rdv);
  }

  getRdvById(id: string) {
    return this.http.get(`${this.apiUrl + '/operator/rendezvous'}/${id}`);
  }
}
