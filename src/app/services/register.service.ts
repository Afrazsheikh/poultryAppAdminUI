import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient)
  { }

  register(data): Observable<any>
  {
    let httpHeaders = new HttpHeaders({
      "Authorization": "Bearer " + localStorage.getItem('token')
    });

    let httpOptions = {headers: httpHeaders}

    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addRestaurant', data, httpOptions);
  }
}
