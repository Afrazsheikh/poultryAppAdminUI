import { Component } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
@Component({
  templateUrl: 'password.component.html',
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false } },
  ]
})

export class PasswordComponent

{

  ownerList: any = [];
  pass: any; 
  
  resetForm: any;

  constructor(private restaurantService: RestaurantService) {
    this.resetForm = new FormGroup({"email": new FormControl(null, [Validators.required]),
                                    "password": new FormControl(null, [Validators.required])
                                    
                                    }),
                              
                                    console.log(this.ownerList);
    
     restaurantService.getAllOwners().subscribe(response => {
       console.log(response);
       this.ownerList = response.owners;
     })                             
    
  }
  resetPass(){

    console.log(this.resetForm.value);
    
    this.restaurantService.resetOwnerPass(this.resetForm.value).subscribe(response => {
      console.log(response);
    })
    
    
    
  }

}
