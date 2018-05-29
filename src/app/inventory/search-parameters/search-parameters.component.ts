import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { cardPop, backgroundOpacity} from '../../animations';

@Component({
  selector: 'app-search-parameters',
  templateUrl: './search-parameters.component.html',
  styleUrls: ['./search-parameters.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class SearchParametersComponent implements OnInit {

  public state = {
    background: 'initial',
    card: 'initial',
  };

  public options = [{
      value: 1,
      view: 'Todo',
    }, {
      value: 2,
      view: 'Productos Con poco Stock',
    }, {
      value: 3,
      view: 'Productos Sin Stock',
    }
  ];

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode === 27) {
      this.closePop();
    } 

  }

  constructor(private router: Router) { }

  ngOnInit() {

    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 5);

  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/inventory']);
    }, 400);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  getSelection(option){

    localStorage.setItem('searchParameter', option.value.toString());
    
  }

}
