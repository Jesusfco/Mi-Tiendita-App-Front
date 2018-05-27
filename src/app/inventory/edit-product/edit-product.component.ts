import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { cardPop, backgroundOpacity } from '../../animations';
import { Product } from '../../product';
import { InventoryService } from '../inventory.service';
import { Storage } from '../../storage';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  animations: [cardPop, backgroundOpacity]
})
export class EditProductComponent implements OnInit {
  
  product: Product = new Product();
  prod: Product = new Product();
  products = [];
  productEditable: Product = new Product();

  inventorySearch: Array<Product> = [];
  productAfter: number;
  productBefore: number;

  observerRef: any;

  store: Storage = new Storage();

  state = {
    background: 'initial',
    card: 'initial',
  }

  public touch: any = {
    touchStart: 0,
    touchMove: 0,
    touchFinish: 0,


    touchClicked: 0
  };

  
  request: boolean = false;
  
  editProcess: boolean = true;

  form = {validate: true, name: 0, code: 0, price: 0}; 

  constructor(private _http: InventoryService,
              private router: Router,
              private actRou: ActivatedRoute) {

                this.inventorySearch = JSON.parse(localStorage.getItem('inventorySearch'));

                this.observerRef = actRou.params.subscribe(params => {
                  this.product = this.store.showProductById(params['id']);
                  Object.assign(this.productEditable, this.product);

                  this.getBeforeAfterProduct();
                });

              }

  @HostListener('document.getElementById("card"):touchmove', ['$event']) doSomething($event) {
    
    this.touch.touchMove = $event.changedTouches[0].clientX - this.touch.touchStart;
    document.getElementById('card').style.transform = "translateX(" + this.touch.touchMove + "px)";

  }

  @HostListener('document.getElementById("card"):touchstart', ['$event']) setInit($event) {
    
    this.touch.touchStart = $event.changedTouches[0].clientX;

  }

  @HostListener('document.getElementById("card"):touchend', ['$event']) decideFinal($event) {

      this.touch.touchFinish = $event.changedTouches[0].clientX;

      if(this.touch.touchMove <= -150){

        this.swipeLeft();

      } else if (this.touch.touchMove >= 150) {

        this.swipeRight();

      } else {

        document.getElementById('card').classList.add('time');
        document.getElementById('card').style.transform = "translateX(0px)";

        setTimeout(() => {

          document.getElementById('card').classList.remove('time');

        }, 400);

      }
    
  }

  ngOnDestroy(){
    this.observerRef.unsubscribe();
    this.state.background = 'initial';
      this.state.card = 'initial';

    if(localStorage.getItem('inventoryUpdateStatus') == '1')
      localStorage.setItem('inventoryUpdateStatus', '0');
  }

  ngOnInit() {
    this.products = this.store.getInventory();
    

    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);

    setTimeout(() => {
    
      document.getElementById('inputNameProduct').focus();

    }, 400);

  }

  getBeforeAfterProduct(){
    let x = this.inventorySearch.length;

    
    for(let i = 0; i < this.inventorySearch.length; i++){

      if(this.inventorySearch[i].id == this.product.id){

        this.productAfter = i + 1;
        this.productBefore = i - 1;

        if(this.productBefore == -1){
          this.productBefore = this.inventorySearch[x - 1].id;
        } else {
          this.productBefore = this.inventorySearch[this.productBefore].id;
        }

        if(this.productAfter == x){
          this.productAfter = this.inventorySearch[0].id;
        } else {
          this.productAfter = this.inventorySearch[this.productAfter].id;
        }

        break;
      }
    }
  }

  formSubmit(){

    this.request = true;

    this.productEditable.upperCaseDepartment();
    this.productEditable.upperCaseName();
    this.productEditable.formatCode();

    this.restoreValidation();
    if(this.validateName())
      this.validateUniqueName();
    if(this.validateCode())
      this.validateUniqueCode();
    this.validatePrice();

    if(this.form.validate == false){
      this.request = false;
      return;
    } 

    this._http.update(this.productEditable).then(
      data => {

        this.request = false;
        this.store.updateProduct(data);
        localStorage.setItem('productUpdated', JSON.stringify({original: this.product, edited: data}));
        localStorage.removeItem('inventoryUpdateStatus');

        let noti = {
          status: 200,
          title: 'Producto Actualizado',
          description: 'Datos cargados a la Base de Datos'
        };

        localStorage.setItem('request', JSON.stringify(noti));

        this.closePop();
      },
      error => {

        this.request = false;

        localStorage.setItem('request', JSON.stringify(error));

      }
    );

  }

  closePop(){

    setTimeout(() => {
      this.router.navigate(['/inventory']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  validateName() {    

    if(this.productEditable.name == ''){

      this.form.name = 1;
      this.form.validate = false;
      return false;
      
    }

    return true;

  }//Fin de validateName public function()

  validateUniqueName() {

    this.form.name = -1;

    for(let x of this.products){
      
      if(this.productEditable.name == x.name){
        
        if(this.productEditable.name !== this.product.name){
          
          this.form.name = 2;
          this.form.validate = false;
          break;

        }

      }

    }
    
  }

  validateCode(){
    if(this.productEditable.code == '') { return false; }
  }//Function that validate Product => Code unique but enable to works if is it null

  validateUniqueCode(){
    this.form.code = -1;

    for(let x of this.products){
        
      if(this.productEditable.code == x.code){

        if(this.productEditable.code !== this.product.code){
          this.form.code = 2;
          this.form.validate = false;
          break;
        }          

      }      
    }    
  }

  validatePrice(){
    if(this.productEditable.price == null){
      this.form.price = 1;
      this.form.validate = false;
    } 
    else { this.form.price = -1 }
  }//Validacion del Precio requerido

  restoreValidation(){
    this.form = {
      validate: true,
      name: 0,
      code: 0,
      price: 0
    };
  }

  // eliminacion del producto
  deleteProduct(){

    this._http.delete(this.product).then(
      data => {
        localStorage.setItem('inventoryUpdateStatus', '2');
        localStorage.setItem('productUpdated', this.product.id.toString());
        this.prod.deleteProductStorage(this.product.id);
        this.closePop();

        let not = {
          status: 200,
          title: 'Producto Eliminado',
          description: 'El Producto se ha eliminado del servidor'
        };

        localStorage.setItem('request', JSON.stringify(not));

      }, error => {

        localStorage.setItem('request', JSON.stringify(error));
        
      }
    );

  }

  detectEsc(x) {
    
    if(x.keyCode == 27) {
      this.closePop();
    }
    
  }

  test(x) {
    console.log(x);
  }
  detectArrow(event){

    if(event.keyCode == 39) {
      this.swipeLeft();
    } else if(event.keyCode == 37) {
      this.swipeRight();
    } else if(event.keyCode == 27) {
      this.closePop();
    }
    
  }

  startTouch(event) {
    if(event.buttons == 0) return;
    
    console.log(event);
  }

  moveTouch(event){

    if((event.buttons == 0 && this.touch.touchClicked == 1)) {
      console.log(this.touch.touchMove);
      this.touch.touchFinish = event.x;
      this.touch.touchClicked--;

      if(this.touch.touchMove <= -150){

        this.swipeLeft();

      } else if (this.touch.touchMove >= 150) {

        this.swipeRight();

      } else {

        document.getElementById('card').classList.add('time');
        document.getElementById('card').style.transform = "translateX(0px)";

        setTimeout(() => {
          document.getElementById('card').classList.remove('time');
        }, 400);

      }


      return;
    }
    else if(event.buttons == 0) return;
    else if(event.buttons == 1 && this.touch.touchClicked == 0) {
      this.touch.touchClicked++;
      this.touch.touchStart = event.x;
      return;
    }

    this.touch.touchMove = event.x - this.touch.touchStart;
    document.getElementById('card').style.transform = "translateX(" + this.touch.touchMove +"px)";
    
  }

  finishTouch(event){

    if(this.touch.touchMove <= -150){

      this.swipeLeft();

    } else if (this.touch.touchMove >= 150) {

      this.swipeRight();

    } else {

      document.getElementById('card').classList.add('time');
      document.getElementById('card').style.transform = "translateX(0px)";

      setTimeout(() => {
        document.getElementById('card').classList.remove('time');
      }, 400);

    }

  }

  swipeLeft(){
    document.getElementById('card').classList.add('time');
        document.getElementById('card').style.transform = "translateX(-800px)";

        setTimeout(() => {
          this.router.navigate(['/inventory/edit/' + this.productAfter]);
          document.getElementById('card').classList.remove('time');
          document.getElementById('card').style.transform = "translateX(800px)";

          setTimeout(() => {
            document.getElementById('card').classList.add('time');
            document.getElementById('card').style.transform = "translateX(0px)";

            setTimeout(() => {
              document.getElementById('card').classList.remove('time');

            }, 400);

          }, 10);
          
        }, 400);
  }

  swipeRight() {

    document.getElementById('card').classList.add('time');
        document.getElementById('card').style.transform = "translateX(800px)";

        setTimeout(() => {
          this.router.navigate(['/inventory/edit/' + this.productBefore]);
          document.getElementById('card').classList.remove('time');
          document.getElementById('card').style.transform = "translateX(-800px)";

          setTimeout(() => {
            document.getElementById('card').classList.add('time');
            document.getElementById('card').style.transform = "translateX(0px)";

            setTimeout(() => {
              document.getElementById('card').classList.remove('time');

            }, 400);

          }, 10);
          
        }, 400);

  }
}
