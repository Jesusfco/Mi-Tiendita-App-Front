import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../product';
import { InventoryService } from '../inventory.service';

import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  animations: [
    trigger('card', [
      
      state('initial', style({
        transform: 'translate3d(0,50%,0) scale(.7)',                
      })),

      state('final' ,style({
        transform: 'translate3d(0,0,0) scale(1)',       
        
      })),      

      transition('initial <=> final' , animate('350ms ease-out')),
    ]),

    trigger('background', [
      
      state('initial', style({        
        opacity: 0
      })),

      state('final' ,style({
              
        opacity: 1
      })),      

      transition('initial <=> final' , animate('250ms ease-out')),
    ])

  ]
})
export class EditProductComponent implements OnInit {
  @Output() editEvent: EventEmitter<any> =  new EventEmitter();
  @Output() editCloseEvent: EventEmitter<any> =  new EventEmitter();
  @Input() product: Product;
  @Input() products: Array<Product>;
  productEditable: Product = new Product();

  state = {
    background: 'initial',
    card: 'initial',
  }

  

  form = {validate: false, name: 0, code: 0, price: 0}; 

  constructor(private _http: InventoryService) { }

  ngOnInit() {
    Object.assign(this.productEditable, this.product);   

    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);
  }

  formSubmit(){
    this.form.validate = true;
    this.validateName();
    this.validateCode();
    this.validatePrice();

    if(this.form.validate !== true) return;

    this._http.update(this.product).then(
      data => {
        this.editEvent.emit({original: this.product, edited: data });
        this.closePop();
      }, 
      error => {

      }
    )

  }

  closePop(){    
    setTimeout(() => {
      this.editCloseEvent.emit();
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  validateName(){

    this.form.name = 0;
    if(this.product.name == null || this.product.name == '')
      this.form.name = 1;

    else {

      for(let x of this.products){

        if(this.product.name == x.name){

          this.form.name = 2;
          this.form.validate = false;
          return;

        }

        this.form.name = -1;
      }

    }

  }//Fin de validateName public function()

  validateCode(){
    if(this.product.code == null){

      this.form.code = 0;

    } else { 
      
      for(let x of this.products){
        
        if(this.product.code == x.code){

          this.form.code = 2;
          this.form.validate = false;
          return;

        }

        this.form.code = -1;
      }
    }

  }//Function that validate Product => Code unique but enable to works if is it null

  validatePrice(){
    if(this.product.price == null){
      this.form.price = 1;
      this.form.validate = false;
    } 
    else { this.form.price = -1 }
  }//Validacion del Precio requerido

}
