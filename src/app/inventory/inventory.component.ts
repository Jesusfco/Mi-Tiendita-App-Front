import { Component, OnInit, Input } from '@angular/core';
import { InventoryService } from './inventory.service';
import { Product } from '../product';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  @Input() products;
  createPro:boolean =  false;

  constructor(private _http: InventoryService) { }

  ngOnInit() {
  }

  newProduct(data){
    alert('si llego aqui');
      this.products.push(data);
  }

  update(data){
    const i = this.products.indexOf(data.original);
    this.products[i] = data.edited;
    this.products[i].edit =  false;
  }

}
