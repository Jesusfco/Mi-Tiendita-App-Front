import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Articulos} from './../articulos';


@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {

    @Input() sale;
    @Output() destroyArticuloEmitEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  
  destroy( articulo: Articulos ){
      this.destroyArticuloEmitEvent.emit(articulo);
  }

}
