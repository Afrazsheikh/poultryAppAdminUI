import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})

export class LoginComponent
{
  loginForm: any;
  errorMsg: any;
  isWaiting: any = true;

  constructor(private httpClient: HttpClient, private loginService: LoginService, private router: Router)
  {
    this.loginForm = new FormGroup({"email": new FormControl(null, [Validators.required]),
                                    "password": new FormControl(null, [Validators.required])});
  }

  login()
  {
    
    this.isWaiting = false;

    this.loginService.login(this.loginForm.value).subscribe((response) => {

      //console.log(response);
      this.isWaiting = true;

      if(response.success) {
        localStorage.setItem('token', response.data);
        this.router.navigate(['/home']);
      }

    },
    (err) => {
      console.log(err.error);
      let error = err.error;
      this.isWaiting = true;
      if(!error.success) {
        this.errorMsg = error.message;
      }
    })
  }
}
