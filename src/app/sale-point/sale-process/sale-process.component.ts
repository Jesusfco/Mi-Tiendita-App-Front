import { Component, OnInit, HostListener } from '@angular/core';
import { cardPop, backgroundOpacity} from '../../animations';
import { Router } from '@angular/router';
import { Sale } from '../sale';
import { SaleService } from '../sale.service';
import { Product } from '../../product';

@Component({
  selector: 'app-sale-process',
  templateUrl: './sale-process.component.html',
  styleUrls: ['./sale-process.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class SaleProcessComponent implements OnInit {

  public sale: Sale = new Sale();
  public inventory: Product =  new Product();

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

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode == 27) {

      if(this.form == 2) {
        this.form = 1;

        setTimeout(() => {
    
          document.getElementById('clientMoneyInput').focus();
    
        }, 20);

      } else {
        this.closePop();
      }
      
    }

  }

  constructor(private router: Router,
            private _http: SaleService) { 
    
    

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

    setTimeout(() => {
    
      document.getElementById('clientMoneyInput').focus();

    }, 400);
  }

  ngOnDestroy() {    
    if(localStorage.getItem('saleStatus') == '1')
      localStorage.setItem('saleStatus', '0');

  }

  checkClientMoney(){
    this.form = 2;

    setTimeout(() => {
    
      document.getElementById('confirmSaleProcess').focus();

    }, 200);
  }

  confirmSale(){

    this.sale.setCreatedAt();
    localStorage.removeItem('saleDescription');
    this._http.postSale(this.sale).then(

      data => {

        let x = parseFloat(localStorage.getItem('userCash'));
        x += this.sale.total;
        localStorage.setItem('userCash', x.toString());

        this.inventory.afterSale(this.sale);
        localStorage.removeItem('saleStatus');

        //NOTIFICACION DE EXITO
        let not = {
          status: 200,
          title: 'Venta Cargada con exito',
          description: 'La venta se ha cargado al servidor'
        };

        localStorage.setItem('request', JSON.stringify(not));

      }

    ).catch(

      error => {

        localStorage.setItem('request', JSON.stringify(error));
        this.sale.storeSaleErrorConnection(this.sale);

      }

    );

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
