import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

@Injectable()
export class CajaService {

    apiUrl: string = "http://localhost:8000/api/";
    constructor(private _http: Http) { }

    getCaja() {
        return this._http.get(this.apiUrl + "getCaja")
            .map(data => data.json())
            .toPromise();
    }

}
