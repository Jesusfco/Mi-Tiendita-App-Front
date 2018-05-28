import { Component, OnInit, HostListener } from '@angular/core';
import { Sale } from '../../sale-point/sale';
import { cardPop, backgroundOpacity } from '../../animations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sale-analysis',
  templateUrl: './sale-analysis.component.html',
  styleUrls: ['./sale-analysis.component.css'],
  animations: [cardPop, backgroundOpacity]
})
export class SaleAnalysisComponent implements OnInit {

  public sal: Sale =  new Sale();

  public analize = {
    neto: 0,
    total: 0,
    undefined: {
      count: 0,
      products: [],
    },
  };

  public salesInterval: any;
  public state = {
    background: 'initial',
    card: 'initial',
  };

  @HostListener('document:keyup', ['$event']) doSomething($event) {
    if($event.keyCode === 27) {
      this.closePop();
    }

  }
  constructor(private router: Router) { 

    if (localStorage.getItem('salesComponent') === undefined) {
      this.setSalesInterval();
      return;
    }

    this.analize = this.sal.getGrossProfit(JSON.parse(localStorage.getItem('salesComponent') ) );
  }

  ngOnInit() {

    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 10);

  }

  setSalesInterval() {

    this.salesInterval = setInterval(() => this.salesIntervalLogic(), 1000);

  }

  salesIntervalLogic() {

    if(localStorage.getItem('salesComponent') == undefined) return;

    this.analize = this.sal.getGrossProfit(JSON.parse(localStorage.getItem('salesComponent') ) );
    localStorage.removeItem('salesComponent')
    clearInterval(this.salesInterval);

  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/sales']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

}
