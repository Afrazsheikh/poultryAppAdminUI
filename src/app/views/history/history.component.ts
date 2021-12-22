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
  datesData: Array<any> = [];

  totalOrderMonths: any[] = [];
  totalSalesMonths: any[] = [];
  totalDeclineMonths: any[] = [];

  totalOrderDays: any[] = [];
  totalSalesDays: any[] = [];
  totalDeclineDays: any[] = [];

  orderGraphDataset: Array<any> = [
    {data: [], label: 'Total Orders'},
    {data: [], label: 'Total Sales'},
    {data: [], label: 'Declined Orders'}
  ];

  lineChartLabels: Array<any>;

  lineChartType = 'line';

  config = {
    /*title: {
        display: true,
        text: 'Total Orders (Weekdays)'
    },*/

    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }],
      xAxes: [{
        ticks: {
          autoSkip: false,
          minRotation: 70
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
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 206, 86)",
        "rgb(34, 16, 230)",
        "rgb(166, 75, 5)",
        "rgb(130, 4, 44)",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 206, 86)",
        "rgb(34, 16, 230)",
        "rgb(166, 75, 5)",
        "rgb(130, 4, 44)",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 206, 86)",
        "rgb(34, 16, 230)",
        "rgb(166, 75, 5)",
        "rgb(130, 4, 44)",
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

    let begDay = moment().startOf('month');
    let endDay = moment().endOf('month');

    console.log(begDay.toString());
    console.log(endDay.toString());


    for(let i = 0; i < 30; i++)
    {
      this.weekDays.push(moment(begDay).add(i, 'days').format('DD'));
      //this.datesData.push(i + 1);
    }

    console.log(this.weekDays);

    this.months = moment.monthsShort();

    this.lineChartLabels = this.weekDays;
    // this.totalOrders[0].data = this.datesData;
    // this.totalDecline

    console.log(this.restId);

    this.lineChartLabels = this.months;
    resturantService.getOrderGraphs(this.restId).subscribe(response => {

      console.log(response);

      response.graphData.totalAccepted.forEach(month => {
        this.totalOrderMonths.push(month.totalOrders);
      });

      response.graphData.totalSales.forEach(month => {
        this.totalSalesMonths.push(month.totalSales);
      });

      response.graphData.totalDenied.forEach(month => {
        this.totalDeclineMonths.push(month.totalOrders);
      });

      this.orderGraphDataset[0].data = this.totalOrderMonths;
      this.orderGraphDataset[1].data = this.totalSalesMonths;
      this.orderGraphDataset[2].data = this.totalDeclineMonths;

      console.log(this.totalOrderMonths);

    },

    err => {
      console.log(err);
    })


    resturantService.getDaysGraphs(this.restId).subscribe(response => {

      console.log(response);

      response.graphData.totalAccepted.forEach(day => {
        this.totalOrderDays.push(day.totalOrders);
      });

      response.graphData.totalSales.forEach(day => {
        this.totalSalesDays.push(day.totalSales);
      });

      response.graphData.totalDenied.forEach(day => {
        this.totalDeclineDays.push(day.totalOrders);
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

      this.orderGraphDataset[0].data = this.totalOrderDays;
      this.orderGraphDataset[1].data = this.totalSalesDays;
      this.orderGraphDataset[2].data = this.totalDeclineDays;

    }
    else if(event.value == 'months')
    {
      this.lineChartLabels = this.months;

      this.orderGraphDataset[0].data = this.totalOrderMonths;
      this.orderGraphDataset[1].data = this.totalSalesMonths;
      this.orderGraphDataset[2].data = this.totalDeclineMonths;

    }
  }
}
