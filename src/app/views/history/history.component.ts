import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import * as moment from 'moment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  restId: any;
  months: any;
  weekDays: Array<any> = [];

  totalOrders: Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Total Orders'}
  ];

  totalSales: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40, 10], label: 'Total Sales'}
  ];

  totalDecline: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40, 10], label: 'Declined Orders'}
  ];

  lineChartLabels: Array<any>;

  lineChartType = 'bar';

  config = {
    /*title: {
        display: true,
        text: 'Total Orders (Weekdays)'
    },*/

    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  chartColors = [
    {
        backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 206, 86)",
        "rgb(34, 16, 230)",
        "rgb(166, 75, 5)",
        "rgb(130, 4, 44)",
      ],
      borderColor: [
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)"
      ]
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute, private resturantService: RestaurantService)
  {
    this.restId = localStorage.getItem('restId');

    let begDay = moment().startOf('week');
    let endDay = moment().endOf('week');

    console.log(begDay.toString());
    console.log(endDay.toString());

    for(let i = 0; i < 7; i++)
    {
      this.weekDays.push(moment(begDay).add(i, 'days').format('DD-MMM-YYYY'));
    }

    console.log(this.weekDays);

    this.months = moment.monthsShort();

    this.lineChartLabels = this.weekDays;

    console.log(this.restId);

    resturantService.getOrderGraphs(this.restId).subscribe(response => {

      console.log(response);
      this.totalOrders[0].data.length = 0;
      response.graphData.forEach(month => {
        this.totalOrders[0].data.push(month.totalOrders);
      });

    },
    err => {
      console.log(err);
    })
    /*
    route.queryParams.subscribe(params => {
      if(router.getCurrentNavigation().extras.state) {
        this.restId = router.getCurrentNavigation().extras.state.restId;
        console.log(this.restId);
      }
    })*/
  }

  ngOnInit(): void {
  }

  setFilter(event)
  {
    if(event.value == 'dates')
    {
      this.lineChartLabels = this.weekDays;
    }
    else if(event.value == 'months')
    {
      this.lineChartLabels = this.months;
    }
  }
}
