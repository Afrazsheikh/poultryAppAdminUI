import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  httpHeaders;
  httpOptions;

  constructor(private httpClient: HttpClient)
  {
    this.httpHeaders = new HttpHeaders({
      "Authorization": "Bearer " + localStorage.getItem('token')
    });

    this.httpOptions = {headers: this.httpHeaders}
  }
  addTopping(id, data): Observable<any>
  {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addRestTopping/' + id, data, this.httpOptions);
  }
  addOption(id, data): Observable<any>
  {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addRestOption/' + id, data, this.httpOptions);
  }
  addToppingGroup(id, data): Observable<any>
  {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addRestToppingGroup/' + id, data, this.httpOptions);
  }
  addCategory(id, data): Observable<any>
  {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addRestCategory/' + id, data, this.httpOptions);
  }
  addItem(id, data): Observable<any>
  {
    return this.httpClient.post(environment.apiBaseUrl + 'adminService/addRestItem/' + id, data, this.httpOptions);
  }
  getCategory(id): Observable<any>
  {
    return this.httpClient.get(environment.apiBaseUrl + 'adminService/getRestCategories/' + id, this.httpOptions);
  }

  getItems(id): Observable<any>
  {
      return this.httpClient.get(environment.apiBaseUrl + 'adminService/getRestItems/' + id, this.httpOptions);
  }

  updateItem(id, data): Observable<any>
  {
      return this.httpClient.put(environment.apiBaseUrl + 'adminService/updateRestItem/' + id, data, this.httpOptions);
  }

  getToppingGroup(id): Observable<any>
  {
      return this.httpClient.get(environment.apiBaseUrl + 'adminService/getRestToppingGroup/' + id, this.httpOptions);
  }

  getOption(id): Observable<any>
  {
      return this.httpClient.get(environment.apiBaseUrl + 'adminService/getRestOption/' + id, this.httpOptions);
  }

  getTopping(id): Observable<any>
  {
      return this.httpClient.get(environment.apiBaseUrl + 'adminService/getRestTopping/' + id, this.httpOptions);
  }

  deleteItem(id): Observable<any>
  {
    return this.httpClient.delete(environment.apiBaseUrl + 'adminService/deleteRestItem/' + id, this.httpOptions);
  }

  deleteCategory(id): Observable<any>
  {
    return this.httpClient.delete(environment.apiBaseUrl + 'adminService/deleteRestCategory/' + id, this.httpOptions);
  }

  deleteOption(id): Observable<any>
  {
    return this.httpClient.delete(environment.apiBaseUrl + 'adminService/deleteRestOption/' + id, this.httpOptions);
  }

  deleteTopping(id): Observable<any>
  {
    return this.httpClient.delete(environment.apiBaseUrl + 'adminService/deleteRestTopping/' + id, this.httpOptions);
  }

  deleteToppingGroup(id): Observable<any>
  {
    return this.httpClient.delete(environment.apiBaseUrl + 'adminService/deleteRestToppingGroup/' + id, this.httpOptions);
  }

  updateCategory(id, data): Observable<any>
  {
          return this.httpClient.put(environment.apiBaseUrl + 'adminService/updateRestCategory/' + id, data, this.httpOptions);
  }

  updateOption(id, data): Observable<any>
  {
      return this.httpClient.put(environment.apiBaseUrl + 'adminService/updateRestOption/' + id, data, this.httpOptions);
  }

  updateTopping(id, data): Observable<any>
  {
      return this.httpClient.put(environment.apiBaseUrl + 'adminService/updateRestTopping/' + id, data, this.httpOptions);
  }

  updateToppingGroup(id, data): Observable<any>
  {
      return this.httpClient.put(environment.apiBaseUrl + 'adminService/updateRestToppingGroup/' + id, data, this.httpOptions);
  }


}
