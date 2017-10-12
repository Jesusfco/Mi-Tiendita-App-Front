import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Inventario } from './../inventario';

@Component({
  selector: 'app-edit-inventario',
  templateUrl: './edit-inventario.component.html',
  styleUrls: ['./edit-inventario.component.css']
})
export class EditInventarioComponent implements OnInit {
    
    @Input() producto: Inventario;
    @Output() updateProductoEvent = new EventEmitter();
    productoEdit: Inventario = new Inventario();
    
    

    constructor() { }

    ngOnInit() {
        Object.assign(this.productoEdit, this.producto);        
    }

    update(){
        this.productoEdit
        this.producto
        this.updateProductoEvent.emit({original: this.producto, edited:this.productoEdit});
        
        this.producto.editable = !this.producto.editable;
    }

}
