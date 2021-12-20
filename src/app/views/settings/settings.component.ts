import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  restId: any = localStorage.getItem('restId');
  settingsForm: any;
  data: any;
  selectedDetail: any;
  option: any;
  coverURL: any;
  originalCover: any;
  msg: any;

  constructor(private restaurantService: RestaurantService,private router: Router) {

    this.setDetails();


    this.settingsForm = new FormGroup({"wifiPrinterIP": new FormControl(null, [Validators.required]),
                                  "wifiPrinterPort": new FormControl(null,  [Validators.required]),
                                  "deliveryRadius": new FormControl(null,  [Validators.required])});
   }

  ngOnInit(): void {
    this.originalCover = this.coverURL = environment.cover + this.restId;
  }

  setDetails()
  {
    this.restaurantService.getRestaurantProfile(this.restId).subscribe((response) => {
      console.log(response);
      if(response.success) {
        this.data = response.data;
        this.settingsForm.patchValue({"wifiPrinterIP":this.data.wifiPrinterIP,
        "wifiPrinterPort": this.data.wifiPrinterPort,
        "deliveryRadius": this.data.deliveryRadius});
        console.log("Patched value....." +  this.settingsForm.value);
        console.log(this.data);
      }

     },
     (err) => {
      console.log(err);
    })

  }

  restaurantSetting(){
    console.log(this.settingsForm.value);

    this.restaurantService.restaurantSetting(this.restId, this.settingsForm.value).subscribe((response) => {
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

  resetDetails(){
    this.settingsForm.patchValue({"wifiPrinterIP": null,
        "wifiPrinterPort": null,
        "deliveryRadius": null});
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
			this.coverURL = reader.result;
		}
	}

  resetImage(){
    this.coverURL = this.originalCover;
  }



}
