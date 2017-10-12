import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Inventario } from '../inventario';
import { MasProducto } from './masProducto';

@Component({
  selector: 'app-agregar-inventario',
  templateUrl: './agregar-inventario.component.html',
  styleUrls: ['./agregar-inventario.component.css']
})
export class AgregarInventarioComponent implements OnInit {

    @Input() producto: Inventario;
    @Output() addProductoEvent = new EventEmitter();

    articuloInformacion: MasProducto = new MasProducto();
    
    constructor() {                  
    }

    ngOnInit() {        
        this.articuloInformacion.idProducto = this.producto.id;
        this.articuloInformacion.inventario = this.producto.inventario;
    }


    update() {
        this.addProductoEvent.emit(this.articuloInformacion);
        this.producto.agregar = !this.producto.agregar;
    }

    check() {
        this.articuloInformacion.inventario = this.producto.inventario + this.articuloInformacion.cantidad;
    }
}
