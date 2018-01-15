import { Component, OnInit } from '@angular/core';
import { cardPop, backgroundOpacity} from '../../animations';
import { Router } from '@angular/router';
import { Sale } from '../sale';

@Component({
  selector: 'app-sale-process',
  templateUrl: './sale-process.component.html',
  styleUrls: ['./sale-process.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class SaleProcessComponent implements OnInit {

  public sale: Sale = new Sale();

  state = [{
    background: 'initial',
    card: 'initial',
  },{
    background: 'final',
    card: 'final'
  },{
    background: 'final',
    card: 'final'
  }];  

  public form: number = 1;

  constructor(private router: Router) { 
    
    localStorage.setItem('saleStatus', '1');

    this.sale.description = this.sale.getLocalSale();
    this.sale.getTotal();
    let money = this.sale.total;
    this.sale.clientMoney = money;

  }

  ngOnInit() {
    setTimeout(() => {
      this.state[0].background = 'final';
      this.state[0].card = 'final';
    }, 80);
  }

  ngOnDestroy() {    
    if(localStorage.getItem('saleStatus') == '1')
      localStorage.setItem('saleStatus', '0');

  }

  checkClientMoney(){
    this.form = 2;
  }

  confirmSale(){
    localStorage.removeItem('saleStatus');
    this.closePop();
  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/sale-point']);
    }, 450);
    this.state[0].background = 'initial';
    this.state[0].card = 'initial';
    
  }

}
