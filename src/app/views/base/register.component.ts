import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { RegisterService } from '../../services/register.service';

@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  date: any;
  time: any;
  days: any = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  ownerList: any = [];
  restaurantDetails: any;
  ownerForm: any;
  errorMsg: any;
  
 

  constructor(private httpClient: HttpClient, private registerService: RegisterService, private router: Router)
  {
    console.log('Register Constructed');
    this.time = moment().format('hh:mm a');
    console.log(moment('2:48 pm', 'hh:mm a').format('HH:mm'));

    this.restaurantDetails = new FormGroup({//"ownerId": new FormControl(null, [Validators.required]),
                                            "restaurantName": new FormControl(null, [Validators.required]),
                                            "location": new FormControl(null, [Validators.required]),
                                            //"shortDescription": new FormControl(null, [Validators.required]),
                                            //"isOnline": new FormControl(true, [Validators.required]),
                                            //"review": new FormControl(null, [Validators.required]),
                                            //"discount": new FormControl(null, [Validators.required]),
                                            "phoneNumber": new FormControl(null, [Validators.required,
                                                                          Validators.min(1000000000), Validators.max(9999999999)]),
                                            //"openTime": new FormControl(null, [Validators.required]),
                                            //"closeTime": new FormControl(null, [Validators.required]),
                                            //"openDay": new FormControl(null, [Validators.required]),
                                            //"closeDay": new FormControl(null, [Validators.required]),
                                            //"passcode": new FormControl(null, [Validators.required]),
                                            //"minimumOrder": new FormControl(null, [Validators.required]),
                                            //"deliveryRadius": new FormControl(null, [Validators.required]),
                                            //"wifiPrinterIP": new FormControl(null, [Validators.required]),
                                            //"wifiPrinterPort": new FormControl(null, [Validators.required]),
                                            "websiteURL": new FormControl(null, [Validators.required])})

    this.ownerForm = new FormGroup({"email": new FormControl(null, [Validators.required, Validators.email]),
                                    "password": new FormControl(null, [Validators.required]),
                                    "cnfmPass": new FormControl(null, [Validators.required])}, this.comparePass);
  }

  

  setTime()
  {
    this.time = moment().format('hh:mm a');
  }

  addOwner()
  {
    this.ownerList.push(this.ownerForm.value.email);
  }

  addRestaurant()
  {
    let owner = this.ownerForm.value, restaurant = this.restaurantDetails.value

    delete owner.cnfmPass;

    this.registerService.register({restaurant: restaurant, owner: owner}).subscribe((response) => {
      console.log(response);
        console.log("Success!");
        this.router.navigate(['home']);
    },
    (err) => {
      this.errorMsg = true; 
      console.log(err);
    })

    console.log(owner);
    console.log(restaurant);
  }

  /*
  uploadFile(event)
  {
    let file = event.target.files[0];

    const formData = new FormData();
    formData.append('cover', file);

    this.httpClient.post(environment.apiBaseUrl + 'ownerService/uploadImage', formData).subscribe((response) => {

      console.log('Uploaded');

    }, (err) => {

      console.log(err);
    })

    console.log(file);
  }*/

  comparePass(ownerData)
  {
    if(ownerData.get('password').value != ownerData.get('cnfmPass').value)
      ownerData.get('cnfmPass').setErrors({PassMatch: "Passwords do not match."});
    return null;
  }
}
