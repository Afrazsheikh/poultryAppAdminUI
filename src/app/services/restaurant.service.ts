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

  getRestOwner(restId): Observable<any>
  {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getRestOwner/' + restId, this.httpOptions);
  }

  getOrderGraphs(restId): Observable<any>
  {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getOrderGraphs/' + restId, this.httpOptions);
  }

  getDaysGraphs(restId): Observable<any>
  {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getDaysGraphs/' + restId, this.httpOptions);
  }

  resetOwnerPass(owner): Observable<any>
  {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/resetPassword', owner, this.httpOptions);
  }

  restaurantSetting(id, settingDetails): Observable<any>
  {
    return this.httpClient.put(environment.apiBaseUrl + 'adminService/restSetting/' + id, settingDetails, this.httpOptions);
  }

  downloadRestaurantImage(id): Observable<any>
  {
    return this.httpClient.get(environment.apiBaseUrl + 'restauranmtService/downloadRestaurantImage/' + id, this.httpOptions);
  }

  addRestaurantImage(): Observable<any>
  {
    return this.httpClient.put(environment.apiBaseUrl + 'restaurantService/addRestaurantImage', this.httpOptions);
  }

  getRestaurantProfile(id): Observable<any>
  {
    return this.httpClient.get(environment.apiBaseUrl + 'restaurantService/profile/' + id, this.httpOptions);
  }
  ownerEditProfile(id, data): Observable<any>
  {
    return this.httpClient.put(environment.apiBaseUrl + 'adminService/ownerEditProfile/' + id, data, this.httpOptions);
  }
  updateRestaurantDiscount(id, discount): Observable<any>
  {
    return this.httpClient.put(environment.apiBaseUrl + 'adminService/updateRestaurantDiscount/' + id, discount, this.httpOptions);
  }
  updateRestaurantStatus(id, status): Observable<any>
  {
    return this.httpClient.put(environment.apiBaseUrl + 'adminService/updateRestaurantStatus/' + id, status, this.httpOptions);
  }


}
