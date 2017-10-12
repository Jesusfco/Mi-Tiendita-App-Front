import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import "rxjs";
import { Observable } from "rxjs";

import { Sale } from './sale';

@Injectable()
export class VentasService {
    apiUrl: string = "http://localhost:8000/api/";
    
    constructor(private _http: Http) { }
    
    postVenta(sale: Sale) {            

        return this._http.post(this.apiUrl + "venta/", sale)
            .map(data => data.json())
            .toPromise();

    }
    
    postVentas(sale: Array<Sale>){
        return this._http.post(this.apiUrl + "venta/array", sale)
            .map(data => data.json())
            .toPromise();
    }    

}




