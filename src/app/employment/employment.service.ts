import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../storage';

@Injectable()
export class EmploymentService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get(this.link.url + 'myUsers' + this.token.getTokenUrl())
            .map(data => data.json())
            .toPromise();
  }

  createUser(user) { 
    return this._http.post(this.link.url + 'myUsers' + this.token.getTokenUrl(), user)
    .map(data => data.json())
    .toPromise();
  }

  editUser(user){
    return this._http.post(this.link.url + 'myUsers/'+ user.id + this.token.getTokenUrl(), user)
    .map(data => data.json())
    .toPromise();
  }

  uniqueEmail(email){
    return this._http.post(this.link.url + 'uniqueEmail', email)
        .map( data => data.json())
        .toPromise();
  }

  uniquePhone(phone){
    return this._http.post(this.link.url + 'uniquePhone', phone)
        .map( data => data.json())
        .toPromise();
  }

}
