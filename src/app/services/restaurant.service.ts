import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  httpHeaders;
  httpOptions;

  constructor(private httpClient: HttpClient)
  {
    this.httpHeaders = new HttpHeaders({
      "Authorization": "Bearer " + localStorage.getItem('token')
    });

    this.httpOptions = {headers: this.httpHeaders}
  }

  getAllRestaurants(): Observable<any>
  {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getAllRestaurants', this.httpOptions);
  }
  
  getAllOwners(): Observable<any>
  {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getOwners', this.httpOptions);
  }

  getOrderGraphs(restId): Observable<any>
  {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getOrderGraphs/' + restId, this.httpOptions);
  }

  resetOwnerPass(owner): Observable<any>
  {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/resetPassword', owner, this.httpOptions);
  }
}
