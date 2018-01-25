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

  intervalUpdate: any;
  intervalCreate: any;

  constructor(private _http: InventoryService) { }

  ngOnInit() {
    this.products = this.storage.getInventory();
    // setInterval(() => this.refreshInventoryFromlocalStore(), 1500);
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
      this.refreshTable();
  }

  update(data){
    for(let i = 0; i < Object.keys(this.products).length; i++){
      if(this.products[i].id == data.original.id){
        this.products[i] = data.edited;
        break;
      }
    }

    this.refreshTable();

  }

  refreshInventoryFromlocalStore(){
    if(this.bucle == true)
      this.products = this.storage.getInventory();
  }

  updateObservable(){
    localStorage.setItem('inventoryUpdateStatus', '1');
    this.intervalUpdate = setInterval(() => this.updateIntervalLogic(), 1000);
  }

  updateIntervalLogic(){
    if(localStorage.getItem('inventoryUpdateStatus') == undefined){
      
      this.update(JSON.parse(localStorage.getItem('productUpdated')));
      localStorage.removeItem('productUpdated');
      clearInterval(this.intervalUpdate);

    } else if(localStorage.getItem('inventoryUpdateStatus') == '0'){
      
      clearInterval(this.intervalUpdate);
      localStorage.removeItem('inventoryUpdateStatus');

    }

    
  }

  createObservable(){
    localStorage.setItem('inventoryCreateStatus', '1');
    this.intervalCreate = setInterval(() => this.createIntervalLogic(), 1000);
  }

  createIntervalLogic(){
    
    if(localStorage.getItem('inventoryCreateStatus') == undefined){
      this.newProduct(JSON.parse(localStorage.getItem('productCreated')));
      localStorage.removeItem('productCreated');
      clearInterval(this.intervalCreate);
      localStorage.removeItem('inventoryCreateStatus');
    } else if(localStorage.getItem('inventoryCreateStatus') == '0'){
      clearInterval(this.intervalCreate);
      localStorage.removeItem('inventoryCreateStatus');
    }

    
  }

  refreshTable(){
    let x = this.search;
    this.search = '';

    setTimeout(() => {
      this.search = x;
    }, 100);
    
  }

  sortDepartment(){
    this.products.sort((a, b) => {
      if(a.department < b.department){
        return -1;
      } else if (a.department > b.department){
        return 1;
      } else {
        return 0;
      }
    });

    this.refreshTable();
  }

  sortName(){
    this.products.sort((a, b) => {
      if(a.name < b.name){
        return -1;
      } else if (a.name > b.name){
        return 1;
      } else {
        return 0;
      }
    });
    this.refreshTable();
  }

  sortPrice(){
    this.products.sort((a, b) => {
      if(a.price < b.price){
        return -1;
      } else if (a.price > b.price){
        return 1;
      } else {
        return 0;
      }
    });

    this.refreshTable();
  }

  sortStock(){
    this.products.sort((a, b) => {
      if(a.stock < b.stock){
        return -1;
      } else if (a.stock > b.stock){
        return 1;
      } else {
        return 0;
      }
    });
    this.refreshTable();
  }

}
