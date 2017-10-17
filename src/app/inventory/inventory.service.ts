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

  create(producto) { 
    return this._http.post(this.link.url + 'inventory/create' + this.token.tokenRequest, producto)
    .map(data => data.json())
    .toPromise();
  }

  update(producto) { 
    return this._http.post(this.link.url + 'inventory/update' + this.token.tokenRequest, producto)
    .map(data => data.json())
    .toPromise();
  }

  delete(producto) { 
    return this._http.delete(this.link.url + 'inventory/delete/'+producto.id + this.token.tokenRequest)
    .map(data => data.json())
    .toPromise();
  }

}
