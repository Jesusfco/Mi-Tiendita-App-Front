import { Component, OnInit } from '@angular/core';
import { Shop } from '../shop';
import { User } from '../user';
import { PerfilService } from './perfil.service';
import { Router } from '@angular/router';
import { Product } from '../product';
import { Payment } from '../payment';
import { Service } from '../service';
import { Storage } from '../storage';
import { Sale } from '../sale-point/sale';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public caja: number = 0;
  public storage: Storage = new Storage();
  public user: User = new User();
  public shop: Shop = new Shop();
  public sale: Sale = new Sale();
  public service: Service = new Service();
  public payment: Payment;
  public products: any;

  public analize = {
        neto: 0,
        total: 0,
        undefined: 0
  };

  constructor(private _http: PerfilService, private router: Router) {
    this.caja = parseInt(this.storage.getCash());

    _http.getPerfil().then(
      data => {
        this.user = data.user;
        this.service = data.service;
        this.shop = data.shop;
        this.payment = data.payment;
        this.analize = this.sale.getGrossProfit(data.sales);
      }, error => {
        console.log(error);
      }
    );
   }

  ngOnInit() {
  }

  cashSubmit(){
    this._http.updateGlobalCash(this.caja).then(
      data => this.storage.storeCash({cash: this.caja}),
      error => console.log(error)
    );
  }

}
