import { Component, OnInit } from '@angular/core';
import { Sale } from '../sale-point/sale';
import { SaleService } from '../sale-point/sale.service';

@Component({
  selector: 'app-sale-component',
  templateUrl: './sale-component.component.html',
  styleUrls: ['./sale-component.component.css']
})
export class SalesComponent implements OnInit {
  public sales = [];


  constructor(private _http: SaleService) {
    this._http.getSales().then(
      data => this.sales = data,
      // data => console.log(data),
      error => console.log(error)
    );
   }

  ngOnInit() {
  }

}