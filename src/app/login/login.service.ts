import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../storage';

@Injectable()
export class LoginService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }

  login(information) {
    return this._http.post(this.link.url + 'login', information)
            .map(data => data.json())
            .toPromise();
  }

  checkAuth() { 

    return this._http.get(this.link.url + 'checkAuth' + this.token.getTokenUrl())
    .map(data => data.json())
    .toPromise();

  }

  getProducts() { 
    return this._http.get(this.link.url + 'inventory/getProducts' + this.token.getTokenUrl())
    .map(data => data.json())
    .toPromise();
  }

  syncProducts(last) {
    return this._http.post(this.link.url + 'inventory/sync' + this.token.getTokenUrl(), {last_updated: last} )
              .map(data => data.json())
              .toPromise();
  }

  syncMoney(money){
    return this._http.post(this.link.url + 'cash/sync' + this.token.getTokenUrl(), {cash: money} )
              .map(data => data.json())
              .toPromise();
  }

  checkConection() {
    return this._http.get(this.link.url + 'checkConection')
              .map(data => data.json())
              .toPromise();
  }

  outServiceSales(sale) {
    return this._http.post(this.link.url + 'sale/outService' + this.token.getTokenUrl(), sale)
    .map(data => data.json())
    .toPromise();
  }
}
