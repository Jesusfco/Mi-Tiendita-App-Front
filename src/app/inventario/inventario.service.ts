import { Inventario } from "app/inventario/inventario";
import { MasProducto } from './agregar-inventario/masProducto';

import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

@Injectable()
export class InventarioService {
    
    
    apiUrl: string = "http://localhost:8000/api/";
    headers: Headers = new Headers;

    constructor(private _http: Http) {
        //this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.append('X-Requested-With', 'XMLHttpRequest');
        this.headers.append('Content-Type', 'x-xsrf-token')
    }

    getInventario() {
        
        return this._http.get(this.apiUrl + "inventario")
            .map(data => data.json())
              .toPromise();
    }
    
    create(producto: Inventario) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.apiUrl + "inventario/new", producto)
            .map(data => data.json())
            .toPromise();                   
    }

    add(producto: MasProducto) {
        return this._http.post(this.apiUrl + "inventario/add", producto)
            .map(data => data.json())
            .toPromise();    
    }
    
    edit(producto: any){
        console.log(producto);
        return this._http.put(this.apiUrl + "inventario/" + producto.id, producto)
            .map(data => data.json());
    }
    
    destroy(producto: Inventario){                
        return this._http.delete(this.apiUrl + "inventario/delete/" + producto.id, 'data')
            .map(data => data.json());
    }
    
//    private _errorHandler(error: Response) {
//        console.error(error);
//        return Observable.
//    }
    errorArranque(error: any) {
        alert('No se establecio conexion con el servidor');
        console.log(error);
    }
}
