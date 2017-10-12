import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Inventario } from "app/inventario/inventario";
import { InventarioFilterPipe } from './inventario-filter.pipe';

declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-inventario-list',
  templateUrl: './inventario-list.component.html',
  styleUrls: ['./inventario-list.component.css']
})
export class InventarioListComponent implements OnInit {
    @Input() productos;
    @Output() destroyProductoEvent = new EventEmitter();
    @Output() UpdateProductoEvent = new EventEmitter();
    search: string = '';
  constructor() { }

  ngOnInit() {
//      $('#searchInventarioInput').focus();
  }
  
    destroy(producto: Inventario){
        this.destroyProductoEvent.emit(producto);
    }
    
    update(producto: any){
        this.UpdateProductoEvent.emit(producto);
    }
    cleanSearch(){
        this.search = '';
    }
}
