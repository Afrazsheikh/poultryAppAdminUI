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
  restaurantList: any[] = [];

  constructor(private restaurantService: RestaurantService)
  {
    this.resetForm = new FormGroup({"restName": new FormControl(null, [Validators.required]),
                                    "email": new FormControl({value: '', disabled: true}, [Validators.required]),
                                    "password": new FormControl({value: '', disabled: true}, [Validators.required])
                                    }),

                                    console.log(this.ownerList);


    this.restaurantService.getAllRestaurants().subscribe(response => {
      response.restaurants.forEach(restaurant => {
        console.log(response);
        this.restaurantList.push({id:restaurant._id, restName: restaurant.restaurantName});
      });

      this.resetForm.patchValue({restName: 'select-restaurant'});
    })

  }

  getRestOwner(event)
  {
    let restId = event.target.value;
    let owner;
    console.log('rest id ' + restId);

    this.restaurantService.getRestOwner(restId).subscribe(response => {
      console.log(response);
      owner = response.owner[0].email;
      this.resetForm.patchValue({email: owner});

      if (this.resetForm.get('email').value.length != 0) {
        this.resetForm.controls('email').enable()
      }

    })
  }

  resetPass()
  {
    console.log(this.resetForm.value);

    this.restaurantService.resetOwnerPass(this.resetForm.value).subscribe(response => {
      console.log(response);
    })

  }

  // validatePass(resetForm)
  // {
  //   if(resetForm.get('password').value.length == 0) {
  //     resetForm.get('password').valid = false;


  //   }
  // }

}
