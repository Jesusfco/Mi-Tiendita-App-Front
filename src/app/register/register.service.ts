import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";
import { Url } from '../url';

@Injectable()
export class RegisterService {

  public link: Url = new Url();
  // public access: Storage = new Storage();

  constructor(private _http: Http) { }

  postNewShop(post){  
      return this._http.post(this.link.url + 'register', post)
        .map( data => data.json())
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

  getToken(inf){
    return this._http.post(this.link.url + 'login', inf)
    .map(data => data.json())
    .toPromise();
  }
}
