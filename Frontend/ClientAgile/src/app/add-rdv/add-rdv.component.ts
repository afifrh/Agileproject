import { Component, OnInit } from '@angular/core';

import timeGridPlugin from '@fullcalendar/timegrid';
import { RdvService } from '../services/rdv.service';
import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap'; // For modals
import { RdvPopupComponent } from '../ModalPopup/rdv-popup/rdv-popup.component';
import { JwtPayload, jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-add-rdv',
  standalone: true,
  imports: [FullCalendarModule,NgbModalModule],
  templateUrl: './add-rdv.component.html',
  styleUrl: './add-rdv.component.css'
})
export class AddRdvComponent  implements OnInit {
  selectedDate: Date | null = null;
  Rdvs: any[] = []; 
  token=localStorage.getItem("myToken")
  id=jwtDecode(this.token)["id"]
  constructor(private service:RdvService ,private router:Router,private modalService: NgbModal) {}
  getAllRdv(){
    this.service.getRdv().subscribe(data=>{
      this.Rdvs=data
      console.log(this.Rdvs)})
  }
  ngOnInit() {
    console.log(this.id)
    this.getAllRdv();
    this.createCalendarEvents();

  }
  createCalendarEvents() {
  const events: any[] = []; // Array to store calendar events

  this.Rdvs.forEach(rdv => {
  

    const event = {
      // title,
      start: new Date(rdv.date),
      end:new Date(rdv.date),
      allDay: true, 
      // You can add other event properties based on your Timerdv data
    };
    events.push(event);
  });
  this.calendarOptions.events = this.Rdvs; // Update calendar events
}

  dateClick(arg:any) {
    
    this.selectedDate = arg.start || arg.date;
  
  
 const modalRef = this.modalService.open(RdvPopupComponent); // Replace with your modal component reference
  modalRef.componentInstance.selectedDate = this.selectedDate;    }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [timeGridPlugin, dayGridPlugin,interactionPlugin], // Removed redundant dayGridPlugin
    select: this.dateClick.bind(this),
    selectable: true,
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    buttonText: {
      prev: 'Prev',
      next: 'Next',
      today: 'Today',
      dayGridMonth: 'Month',
      timeGridWeek: 'Week',
      timeGridDay: 'Day'
    }
  };
}
  
