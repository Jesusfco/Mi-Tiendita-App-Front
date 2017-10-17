import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../storage';

@Injectable()
export class InventoryService {
  
  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }

  getProducts() { 
    return this._http.get(this.link.url + 'inventory/getProducts' + this.token.tokenRequest)
    .map(data => data.json())
    .toPromise();
  }

}
