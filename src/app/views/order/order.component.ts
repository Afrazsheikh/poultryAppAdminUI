import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Router, NavigationExtras } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewChecked {

  restId: any = localStorage.getItem('restId');
  data: any;
  activeSegment = 'Today';
  ordersData: any;
  date: any = moment();
  minDate: any = '1990-01-01';
  maxDate: any = new Date(this.date.year(), this.date.month(), this.date.date());
  calendarOptions: any;

  @ViewChild('fullCalendar') fullCalendar: FullCalendarComponent;
  calendar: Calendar;
  segmantCheck: any = true;


  constructor(private restaurantService: RestaurantService,private router: Router) {

    this.getOrders();


   }

  ngOnInit(): void {
  }

  CalendarOptions = {
    initialView: 'dayGridMonth',
    validRange: {
      start: '1990-01-01',
      end: new Date(this.date.year(), this.date.month(), this.date.add(1, 'days').date())
    },
    //dateClick: this.dateClick(this)

  };

  /* ngAfterViewInit() {
    this.calendarApi = this.calendarComponent.getApi();
  } */

  ngAfterViewChecked() {
    if(this.fullCalendar) {
      this.calendar = this.fullCalendar.getApi();
    }
  }

  getOrders(){

    this.activeSegment = 'Today';
    this.restaurantService.getOrders(this.restId).subscribe((response) => {
      console.log(response);
      if(response.success) {
        this.ordersData = response.data;
        console.log(response);
      }

     },
     (err) => {
      console.log(err);
    })
  }

  getOrderHistory(){

    this.activeSegment = 'History';
    this.restaurantService.getOrderHistory(this.restId).subscribe((response) => {
      console.log(response);
      if(response.success) {
        this.data = response.data;
        this.segmantCheck = false;
        console.log(this.data);
      }

     },
     (err) => {
      console.log(err);
    })

  }

  setCalenderView(event){
    console.log(event.value);
    const date = moment(event.value, "DD/MM/YYYY").format("YYYY-MM-DD");
    this.calendar.gotoDate(date);

  }

  eventClick(model) {
    //console.log(model.target.ariaLabel);

     console.log(this.calendar.getDate());
 }

 dateClick(event)
 {
  console.log(event);
  this.segmantCheck = true;
  this.activeSegment = 'Today';
 }
}
