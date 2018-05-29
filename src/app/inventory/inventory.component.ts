import { Component, OnInit } from '@angular/core';
import { InventoryService } from './inventory.service';
import { Product } from '../product';
import { Storage } from '../storage';
import { Url } from '../url';
import { FilterInventoryPipe } from './filter-inventory.pipe';
import { PageEvent } from '@angular/material';
// import { setInterval } from 'timers';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  
})
export class InventoryComponent implements OnInit {

  products: Array<Product> = [];
  backProducts: Array<Product> = [];
  searchProducts: Array<Product> = [];
  search: string = '';
  createPro: boolean =  false;
  storage: Storage = new Storage();
  url: Url = new Url();

  lenghtArrayOptions: Array<number> = [ 10, 25, 50, 100, 200 ];
  pageOption: Array<number> = [];

  pageEvent: PageEvent;
  pageValue = 
    {pageIndex: 1, pageSize: 25, length: this.countProduct() };
  

  bucle: boolean = true;

  sort: any = {
    name: 0,
    price: -1,
    cost: -1,
    stock: -1,
    reorder: -1,
    department: -1,
    code: -1,
  };

  public intervalUpdate: any;
  public intervalCreate: any;
  public intervalSearch: any;

  constructor(private _http: InventoryService) { }

  ngOnInit() {
    this.backProducts = this.storage.getInventory();
    this.searchProducts = this.backProducts;
    
    for(let x = 0; x < 25; x ++){
      if(x == Object.keys(this.searchProducts).length) { break;}
      this.products.push(this.searchProducts[x]);
    }
    
    this.intervalUpdate = setInterval(() => this.updateIntervalLogic(), 1000);

  }

  setSearchInterval() {
    this.intervalSearch = setInterval(() => this.updateIntervalLogic(), 1000);
  }

  searchIntervalLogic() {
    if(localStorage.getItem('searchParameter') == undefined) { return; }

    let parameter = parseInt(localStorage.getItem('searchParameter'));

    if(parameter == 1) {

    } else if (parameter == 2) {

      

    } else if( parameter == 3) {

    }

  }

  testPage($event){
    
    this.pageEvent = $event;
    let page =  this.pageEvent.pageIndex;
    let items = this.pageEvent.pageSize;
    
    this.products = [];

    for(let x = 0; x < items; x ++){
      if(x + (page * items) == Object.keys(this.searchProducts).length) { break;}
      this.products.push(this.searchProducts[x + (page * items)]);
    }
    

  }

  countProduct(){
    if(this.products == undefined) { return 0;}
    else {

        return Object.keys(this.searchProducts).length;


    }
  }

  nextPage(){
    console.log('siguiente pagina');
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
    
    for (let i = 0; i < Object.keys(this.products).length; i++) {

      if (this.backProducts[i].id == data.original.id) {

        this.backProducts[i] = data.edited;
        break;

      }

    }

    setTimeout(() => {
          
      this.refreshTable();
      localStorage.setItem('inventorySearch', JSON.stringify(this.searchProducts));
      
    }, 50);
    
    

  }

  delete(id){
    for(let x = 0; x < Object.keys(this.products).length; x++){
      if(this.products[x].id == id){
        this.products.splice(x, 1);
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
    localStorage.setItem('inventorySearch', JSON.stringify(this.searchProducts));
  }

  updateIntervalLogic(){
      
    if(localStorage.getItem('productUpdated') == undefined) return;

      this.update(JSON.parse(localStorage.getItem('productUpdated')));
      localStorage.removeItem('productUpdated');

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
    
    this.products = [];

    if(this.pageEvent == undefined){
    
      for(let x = 0; x < 25; x ++){
        if(x == Object.keys(this.searchProducts).length) { break;}
        this.products.push(this.searchProducts[x]);
      }

    } else {
      
      for(let x = 0; x < this.pageEvent.pageSize; x ++){
        if(x + (this.pageEvent.pageIndex * this.pageEvent.pageSize) == Object.keys(this.searchProducts).length) { break;}
        this.products.push(this.searchProducts[x + (this.pageEvent.pageIndex * this.pageEvent.pageSize)]);
      }

    }

  }

  searchWriting(){
    if(this.pageEvent != undefined){
      this.pageEvent.pageIndex = 0;
    }
    
    this.searchProducts = this.searchFilter();
    this.refreshTable();
  }

  searchFilter(){
    this.searchProducts = this.backProducts;
    let busqueda = this.search;
    if(this.search === undefined) return this.searchProducts;

    

    return this.searchProducts.filter(function(product){
      if(product.code != undefined && product.department != undefined)
      return (product.name.includes(busqueda.toUpperCase()) || product.code.includes(busqueda) || product.department.includes(busqueda.toUpperCase()));

      else if( product.code != undefined && product.department == undefined)
      return (product.name.includes(busqueda.toUpperCase()) || product.code.includes(busqueda));

      else if( product.code == undefined && product.department != undefined)
      return (product.name.includes(busqueda.toUpperCase()) || product.department.toUpperCase().includes(busqueda.toUpperCase()));

      else if( product.code == undefined && product.department == undefined)
      return (product.name.includes(busqueda.toUpperCase()));
    });
  }

  searchUnderReorder() {
    this.searchProducts = this.backProducts;
    let busqueda = this.search;
    if(this.search === undefined) return this.searchProducts;


  }

  searchOutStock() {

  }

  sortDepartment(){
    this.searchProducts.sort((a, b) => {

      if(a.department != undefined) a.department.toUpperCase();
      if(b.department != undefined) b.department.toUpperCase();

      if(a.department < b.department){
        return -1;
      } else if (a.department > b.department){
        return 1;
      } else if(a.department == ''){
        return 1;
      }else {
        return 0;
      }
    });

    this.refreshTable();
  }

  sortName(){

    if(this.sort.name == 0) {
      
      this.searchProducts.sort((a, b) => {
        if(a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.name = 1;

    } else if ( this.sort.name == 1 ) {

      this.searchProducts.sort((a, b) => {
        if(a.name > b.name) {
          return -1;
        } else if (a.name < b.name) {
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.name = 0;

    }
    
    this.refreshTable();
  }



  sortPrice(){

    if(this.sort.price == -1 || this.sort.price == 0){

      this.searchProducts.sort((a, b) => {
        if(a.price < b.price){
          return -1;
        } else if (a.price > b.price){
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.price = 1;

    } else if (this.sort.price == 1){

      this.searchProducts.sort((a, b) => {
        if(a.price > b.price){
          return -1;
        } else if (a.price < b.price){
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.price = 0;

    }
    

    this.refreshTable();
  }

  sortStock(){

    if(this.sort.stock == -1 || this.sort.stock == 0){

      this.searchProducts.sort((a, b) => {
        if(a.stock < b.stock) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.stock = 1;

    } else if(this.sort.stock == 1 ) {
    
      this.searchProducts.sort((a, b) => {
        if(a.stock > b.stock) {
          return -1;
        } else if (a.stock < b.stock) {
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.stock = 0;

    }

    this.refreshTable();

  }

  sortCode(){
    let s = this.sort.code;

    if(this.sort.code <= 0){
      
      this.searchProducts.sort((a, b) => {
        if(a.code < b.code){
          return -1;
        } else if (a.code > b.code){
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.code = 1;

    } else {

      this.searchProducts.sort((a, b) => {
        if(a.code > b.code){
          return -1;
        } else if (a.code < b.code){
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.code = 0;

    }
    
    this.refreshTable();
  }

  sortCost() {

    let s = this.sort.cost;

    if(this.sort.cost <= 0){
      
      this.searchProducts.sort((a, b) => {
        if(a.cost_price < b.cost_price){
          return -1;
        } else if (a.cost_price > b.cost_price){
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.cost = 1;

    } else {

      this.searchProducts.sort((a, b) => {
        if(a.cost_price > b.cost_price){
          return -1;
        } else if (a.cost_price < b.cost_price){
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.cost = 0;

    }

    this.refreshTable();

  }

  sortReorder() {

    let s = this.sort.reorder;

    if(this.sort.reorder <= 0){
      
      this.searchProducts.sort((a, b) => {
        if(a.reorder < b.reorder){
          return -1;
        } else if (a.reorder > b.reorder){
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.reorder = 1;

    } else {

      this.searchProducts.sort((a, b) => {
        if(a.reorder > b.reorder){
          return -1;
        } else if (a.reorder < b.reorder){
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.reorder = 0;

    }

    this.refreshTable();

  }



}
