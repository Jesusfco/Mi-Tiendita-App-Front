import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../storage';

@Injectable()
export class PerfilService {

  public link: Url = new Url();
  public storage: Storage = new Storage();

  constructor(private _http: Http) { }

  updateGlobalCash(cash){
    return this._http.post(this.link.url + 'cash/globalCash' + this.storage.getTokenUrl(), {money: cash})
    .map(data => data.json())
    .toPromise();
  }

  getPerfil(){
    return this._http.get(this.link.url + 'perfil' + this.storage.getTokenUrl())
    .map(data => data.json())
    .toPromise();
  }
}
