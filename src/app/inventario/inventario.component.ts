import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Inventario } from "./inventario";
import { InventarioService }  from './inventario.service';

import "rxjs";
import { Observable } from "rxjs";

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
    
//    productos: Inventario[] = [];  
//    productos: Array<Inventario> = [];  
    @Input() productos;
    @Output() newProductoEmitter = new EventEmitter();
        
    destroyMsj: string;
    serverResponseProduct: Inventario;
    
    ventanaP: boolean;  
    
    constructor(private _inventarioService: InventarioService) { }            

    ngOnInit() {

    }
            
    create(producto: Inventario){
        this._inventarioService.create(producto)
            .then(
                res => console.log(res),
                error => alert('Por el momento no dispone de conexion para guardar el nuevo producto')
                ); 


        
        
        
    }
    
    destroy(producto: Inventario){
        this._inventarioService.destroy(producto)
            .subscribe(res => this.destroyMsj = res);                        
        
        const i = this.productos.indexOf(producto);
        this.productos.splice(i, 1);
    }
    
    update(producto:any){
        this._inventarioService.edit(producto.edited)
            .subscribe(res=> this.serverResponseProduct = res);
        const i = this.productos.indexOf(producto.original)
        producto.edited.editable = false;
        this.productos[i] = producto.edited;
        
    }

    storeEmitter(producto: Inventario) {

        alert('Nuevo Producto Registrado');  
        console.log(producto);        
        this.productos.push(producto);

        console.log(this.productos);
        
    }
  
  
    
}
