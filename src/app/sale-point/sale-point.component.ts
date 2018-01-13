import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory/inventory.service';
import { SaleService } from './sale.service';
import { Product } from '../product';
import { Storage } from '../storage';
import { Sale } from './sale';
import { SaleDescription } from './sale-description';

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

  constructor(private _http: SaleService, 
              private inventoryService: InventoryService, 
              private router: Router) {
                
                this.inventory = this.storage.getInventory();
  }

  ngOnInit() {
  }

  identifyProduct(){
    this.restoreFormValue();
    for(let x of this.inventory){
      
      if(x.code == this.search.name || x.name == this.search.name){
          
        this.sale.pushProduct({
            id_product: x.id,
            name: x.name,
            price: x.price,
            quantity: this.search.quantity,
          });
          
        this.restoreSearch();

        break;
      }

    }
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

}
