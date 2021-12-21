import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  discountForm: any;
  details: any;
  discount: any;
  restId: any = localStorage.getItem('restId');

  constructor(private restaurantService: RestaurantService,private router: Router) {
    

    this.discountForm = new FormGroup({"deliveryDiscount": new FormControl(null, [Validators.required]),
                                       "collectionDiscount": new FormControl(null,  [Validators.required])});
  }

  ngOnInit(): void {
  }

  updateRestaurantDiscount (){
    console.log(this.restId);

    this.restaurantService.updateRestaurantDiscount(this.restId, this.discount).subscribe((response) => {
      console.log(response);
      if(response.success) {
        this.details = response.data;

        this.discountForm.patchValue({"deliveryDiscount":this.details.restaurantName,
                                      "collectionDiscount": this.details.location});
        console.log("Patched value....." +  this.discountForm.value);
        console.log(this.details);
      }

     },
     (err) => {
      console.log(err);
    })
  }

}
