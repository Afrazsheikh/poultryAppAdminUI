import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-instant-action',
  templateUrl: './instant-action.component.html',
  styleUrls: ['./instant-action.component.scss']
})
export class InstantActionComponent implements OnInit {

  restId: any = localStorage.getItem('restId');
  data: any;
  status: boolean;
  isLoading: boolean = true;

  constructor(private restaurantService: RestaurantService,private router: Router) {

    this.getStatus();

   }

  ngOnInit(): void {
  }

  getStatus(){

    this.restaurantService.getRestaurantProfile(this.restId).subscribe((response) => {
      console.log(response);
      if(response.success) {
        this.isLoading = false;
        this.data = response.data;
        this.status = this.data.isOnline;

        console.log(this.status);
      }

     },
     (err) => {
      console.log(err);
    })
  }

  setStatus() {

    this.status = !this.status;

    this.restaurantService.updateRestaurantStatus(this.restId, {isOnline: this.status}).subscribe((response) => {
      console.log(response);
      if(response.success) {
        this.data = response.data;
        console.log(this.data);
      }

     },
     (err) => {
      console.log(err);
    })
  }

}
