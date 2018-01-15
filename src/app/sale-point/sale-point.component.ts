import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory/inventory.service';
import { SaleService } from './sale.service';
import { Product } from '../product';
import { Storage } from '../storage';
import { Sale } from './sale';
import { SaleDescription } from './sale-description';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sale-point',
  templateUrl: './sale-point.component.html',
  styleUrls: ['./sale-point.component.css']
})
export class SalePointComponent implements OnInit {

  public inventory = [];
  public sale: Sale = new Sale();
  public descripton: SaleDescription = new SaleDescription();
  public search = {
    name: undefined,
    quantity: 1,
  };

  public form = {
    validate: true,
    name: 0,
  };

  public sales = [];
  public storage: Storage = new Storage();

  public observerSale: any;

  public interval: any = 0;

  constructor(private _http: SaleService, 
              private inventoryService: InventoryService, 
              private router: Router) {

                this.inventory = this.storage.getInventory();
                if(this.sale.getLocalSale() != undefined){
                  this.sale.description = this.sale.getLocalSale();
                  this.sale.getTotal();
                }

  }

  ngOnInit(){}

  identifyProduct(){
    this.restoreFormValue();
    for(let x of this.inventory){
      
      if(x.code == this.search.name || x.name == this.search.name.toUpperCase()){
          
        this.sale.pushProduct({
            product_id: x.id,
            name: x.name,
            price: x.price,
            quantity: this.search.quantity,
          });
          
        this.restoreSearch();

        break;
      }
    }
    // this.sale.storageLocalSale();

  }

  restoreFormValue(){
    this.form = {
      validate: true,
      name: 0,
    };
  }

  restoreSearch(){
    this.search = {
      name: undefined,
      quantity: 1,
    };
  }

  restoreSale(){
    this.sale = new Sale();
  }

  storageSale(){
    localStorage.setItem('sale', JSON.stringify(this.sale));
  }

  getSale(){
    return JSON.parse(localStorage.getItem('sale'));
  }

  goSaleProcess(){ 
    // this.sale.sendStoreSales();
    this.interval = setInterval(() => this.intervalSaleLogic(), 1000);
    this.router.navigate(['/sale-point/sale-process']);
  }

  intervalSaleLogic(){
    
    if(localStorage.getItem('saleStatus') == undefined){
      this.sale = new Sale();
      this.exitInterval();      
    } else if(localStorage.getItem('saleStatus') == '0'){
      this.exitInterval();
    }
  }

  exitInterval(){
    clearInterval(this.interval);
  }

}
