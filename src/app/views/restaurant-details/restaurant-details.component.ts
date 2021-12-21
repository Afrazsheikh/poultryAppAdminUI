import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {

  restaurantDetailsForm: any;
  details: any;
  restId: any = localStorage.getItem('restId');
  msg: any;
  logoURL: any;
  originalLogo: any;

  constructor(private restaurantService: RestaurantService,private router: Router) {

    this.getRestaurantDetails();

    this.restaurantDetailsForm = new FormGroup({"restaurantName": new FormControl(null, [Validators.required]),
                                                "location": new FormControl(null,  [Validators.required]),
                                                "phoneNumber": new FormControl(null,  [Validators.required]),
                                                "restEmail": new FormControl(null,  [Validators.required]),
                                                "vatNumber": new FormControl(null,  [Validators.required]),
                                                "collectionTime": new FormControl(null,  [Validators.required])});
  }

  ngOnInit(): void {
    this.originalLogo = this.logoURL = environment.logo + this.restId;
  }

  getRestaurantDetails (){

    console.log(this.restId);

    this.logoURL = environment.logo + this.restId;

     this.restaurantService.getRestaurantProfile(this.restId).subscribe((response) => {
      console.log(response);
      if(response.success) {
        this.details = response.data;

        this.restaurantDetailsForm.patchValue({"restaurantName":this.details.restaurantName,
        "location": this.details.location,
        "phoneNumber": this.details.phoneNumber,
        "restEmail": this.details.restEmail,
        "vatNumber": this.details.vatNumber,
        "collectionTime": this.details.collectionTime
      });
        console.log("Patched value....." +  this.restaurantDetailsForm.value);
        console.log(this.details);
      }

     },
     (err) => {
      console.log(err);
    })
  }

  addRestaurantDetails(){
    console.log(this.restaurantDetailsForm.value);

    this.restaurantService.ownerEditProfile(this.restId, this.restaurantDetailsForm.value).subscribe((response) => {
      console.log(response);
      if(response.success) {
        this.details = response.data;
        console.log(this.details);
      }

     },
     (err) => {

      console.log(err);
    })
  }

  resetDetails(){
    this.restaurantDetailsForm.patchValue({"restaurantName": null,
        "location": null,
        "phoneNumber": null,
        "restEmail": null,
        "vatNumber": null,
        "collectionTime": null});
  }

  selectFile(event: any) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}

		var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.msg = "";
			this.logoURL = reader.result;
		}
	}

  resetImage(){
    this.logoURL = this.originalLogo;
  }

}
