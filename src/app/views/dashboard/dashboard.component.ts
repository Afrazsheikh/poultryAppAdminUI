import { Component, OnDestroy, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { HttpClient } from '@angular/common/http';
// import { RestaurantService } from '../../services/restaurant.service';
import { Router, NavigationExtras } from '@angular/router';
import { SocketService } from '../../services/socket.service';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  email: any;
  restaurants: any;
  countOpen: number = 0;
  countClosed: number = 0;
  isLoading: boolean

  constructor( private router: Router, private socketService: SocketService)
  {}
  // {
  //   this.isLoading = true;
  //   this.email = localStorage.getItem('email');
  //   restaurantService.getAllRestaurants().subscribe((response) => {
  //     this.isLoading = false;

  //     console.log(response);

  //     if(response.success) {
  //       this.initOrderSummary(response.restaurants)
  //     }

  //   },
  //   (err) => {
  //     console.log(err);
  //   })
  // }

  ngOnInit()
  {
    this.socketService.joinAdmin(this.email);
    this.listenSockets();
  }

  listenSockets()
  {
    this.socketService.on('onOrderSummaryChange').subscribe((data) => {
      console.log(data);
    })
  }

  initOrderSummary(restaurants)
  {
    this.countOpen = 0;
    this.countClosed = 0;
    this.restaurants = restaurants
    this.restaurants.forEach(rest => {
      rest.isOnline ? ++this.countOpen : ++this.countClosed;
    });
  }

  navToGraph(index)
  {
    localStorage.setItem('restId', this.restaurants[index]._id);
    this.router.navigate(['home/history']);

    /*
    let navExtras: NavigationExtras = {
      state: {restId: this.restaurants[index]._id}
    }*/

  }

  navToMenu(index)
  {
    localStorage.setItem('restId', this.restaurants[index]._id);
    this.router.navigate(['home/menus']);

    /*
    let navExtras: NavigationExtras = {
      state: {restId: this.restaurants[index]._id}
    }*/
  }

  ngOnDestroy(): void {
    this.socketService.leaveAdmin(this.email);
  }
}
