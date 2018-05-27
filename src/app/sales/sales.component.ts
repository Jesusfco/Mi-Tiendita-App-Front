import { Component, OnInit } from '@angular/core';
import { Sale } from '../sale-point/sale';
import { SaleService } from '../sale-point/sale.service';
import { Url } from '../url';
import { Storage } from '../storage';

@Component({
  selector: 'app-sale-component',
  templateUrl: './sale-component.component.html',
  styleUrls: ['./sale-component.component.css']
})
export class SalesComponent implements OnInit {
  public sales: Array<Sale> = [];
  public sal: Sale =  new Sale();

  public date = {
    from: null,
    to: null,
  };
  
  public analize = {
    neto: 0,
    total: 0,
    undefined: {
      count: 0,
      products: [],
    },
  };

  public request: boolean = false;

  public storage: Storage = new Storage();
  public url: Url = new Url();


  constructor(private _http: SaleService) {

    this.request = true;
    this.getDates();

    this._http.getSales().then(
      data => {

        this.request = false;
        this.sales = data;
        this.analize = this.sal.getGrossProfit(data);

      },
      error => {
          console.log(error);
          this.request = false;
        }
      );

   }

  ngOnInit() {
  }

  search(){
    this.request = true;

    this.validateFromTo();
    this._http.getSalesParameter(this.date).then(
      data => {

        this.request = false;
        this.sales = data;
        this.analize = this.sal.getGrossProfit(data);

      },
      error => {
        console.log(error);
        this.request = false;
      },
    );

    if (this.date.from !== undefined && this.date.to === undefined){

      

    }
    else if (this.date.from !== undefined && this.date.to !== undefined){

    }

  }

  validateFromTo() {
    let d = new Date(this.date.from);
    let x = new Date(this.date.to);

    if(d > x) {
      let yy = this.date.from;
      this.date.from = this.date.to;
      this.date.to = yy;

    }
  }

  getDates(){
    let d = new Date();

    if(d.getMonth() <= 7){
      this.date.from = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-" + d.getDate();
      this.date.to = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-" + (d.getDate() + 1);
    } else if (d.getMonth() == 8){
      this.date.from = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-" + d.getDate();
      this.date.to = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-" + (d.getDate() + 1);
    } else {
      this.date.from = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-" + d.getDate();
      this.date.to = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-" + (d.getDate() + 1);
    }
  }

}

