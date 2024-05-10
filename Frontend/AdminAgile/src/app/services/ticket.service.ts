import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../Models/Ticket.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  apiUrl = 'http://localhost:1999';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl + '/operator/ticket');
  }
  addTicket(ticket: any) {
    return this.http.post(`${this.apiUrl}/client/ticket`, ticket);
  }
  
}
