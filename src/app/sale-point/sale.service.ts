import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../storage';

@Injectable()
export class SaleService {

  public link: Url = new Url();
  public storage: Storage = new Storage();

  constructor(private _http: Http) { }

  postSale(sale) {
    return this._http.post(this.link.url + 'sale' + this.storage.getTokenUrl(), sale)
    .map(data => data.json())
    .toPromise();
  }

  outServiceSales(sale) {
    return this._http.post(this.link.url + 'sale/outService' + this.storage.getTokenUrl(), sale)
    .map(data => data.json())
    .toPromise();
  }
}
