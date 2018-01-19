import { Component, OnInit } from '@angular/core';
import { InventoryService } from './inventory.service';
import { Product } from '../product';
import { Storage } from '../storage';
import { FilterInventoryPipe } from './filter-inventory.pipe';
// import { setInterval } from 'timers';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  
})
export class InventoryComponent implements OnInit {

  products = [];
  search: string;
  createPro:boolean =  false;
  storage: Storage = new Storage();


  bucle: boolean = true;

  constructor(private _http: InventoryService) { }

  ngOnInit() {
    this.products = this.storage.getInventory();
    setInterval(() => this.refreshInventoryFromlocalStore(), 1500);
  }

  countProduct(){
    if(this.products == undefined) { return 0}
    else {
      return Object.keys(this.products).length;
    }
  }

  validateLimitProduct(){
    if(this.countProduct() < this.storage.getLimitProduct()){
      return true;
    } return false;
  }

  newProduct(data){
    
      this.products.push(data);
  }

  update(data){
    const i = this.products.indexOf(data.original);
    this.products[i] = data.edited;
    this.products[i].edit =  false;
  }

  refreshInventoryFromlocalStore(){
    if(this.bucle == true)
      this.products = this.storage.getInventory();
  }

}
