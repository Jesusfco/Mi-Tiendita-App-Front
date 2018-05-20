import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { Http } from '@angular/http';

import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { LoginService } from './login/login.service';
import { Storage } from './storage';
import { Router } from '@angular/router';
import { Product } from './product';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('loaderImg', [
      
      state('initial', style({
        transform: 'translate3d(0,80%,0) scale(.7)',        
        opacity: 0
      })),

      state('final' , style({
        transform: 'translate3d(0,0,0) scale(1)',       
        opacity: 1
      })),      

      transition('initial <=> final' , animate('1000ms ease-out')),
    ]),

    trigger('loader', [
      
      state('initial', style({        
        opacity: 1
      })),

      state('final' , style({
        display: 'none',       
        opacity: 0
      })),      

      transition('initial <=> final' , animate('500ms ease-out')),
    ])

  ]
})
export class AppComponent {
  
  // @ViewChild('btnAnimation') fileInput:ElementRef;
  stateLoaderImg: string = "initial";
  stateLoader: string = "initial";

  storage: Storage = new Storage();

  inventory: Product = new Product();
  syncInventoryInterval: any;

  constructor(private _http: LoginService, private router: Router){}

  ngOnInit(){

    // console.log(navigator.connection);
    setTimeout(() => {
      
      this.loaderAnimationImg();      
      
      if (this.storage.token == null || this.storage.token == ''){  
      
        if (this.router.url !== '/register'){
          this.router.navigate(['/login']);
          
        }
          

        setTimeout(() => {
          this.loaderAnimation();
        }, 600);
        return;
      }
  
      this.checkLogin();

    }, 100);

    

    
  }

  // test(){
  //   this.fileInput.nativeElement.click();
  // }

  loaderAnimationImg(){
    this.stateLoaderImg = (this.stateLoaderImg === 'initial' ? 'final' : 'initial');
  }
  loaderAnimation(){
    this.stateLoader = (this.stateLoader === 'initial' ? 'final' : 'initial');
  }

  checkLogin(){    

    this._http.checkAuth().then(

      data => {

        this.storage.storageUserData(data.user);

        if (data.user.cash == undefined) { this.storage.storeCash(data.shop); }

        this.storage.storeServiceData(data.service);

        this.storeInventoryHttp();

        setTimeout(() => {

          this.loaderAnimation();

          if (this.router.url == '/login' || this.router.url == '/register'){

            this.router.navigate(['/sale-point']);

          }

        }, 800);


      },
      error =>  {

        localStorage.setItem('request', JSON.stringify(error));

        if (error.status == 0){
          
          if (this.router.url == '/login' || this.router.url == '/register'){

            this.router.navigate(['/sale-point']);
            
          }

        } else {

          localStorage.removeItem('token');
          this.router.navigate(['/login']);

        }

        setTimeout(() => {

          this.loaderAnimation();

        }, 800);

      } // Fin del Error

    );

  }

  storeInventoryHttp(){

    this._http.getProducts().then(

      data => {

          this.storage.storageInventory(data);
          this.setSyncInventoryInterval();
      },

      error => console.log(error)

    );

  }

  setSyncInventoryInterval() {

    this.syncInventoryInterval = setInterval(() => this.syncInventory(), 5000);

  }

  syncInventory() {

    let inventory = JSON.parse(localStorage.getItem('inventory') );

    let last = new Date(0, 0, 0, 0, 0, 0);

    let product;
    for (let x of inventory) {

      if (new Date(x.updated_at) > last) {
        last = new Date(x.updated_at);
        product = x.name;
      }

    }

    let updatedFormat = last.getFullYear() + '-' + (last.getMonth() + 1) + '-' + last.getDate()
            + ' ' + last.getHours() + ':' + last.getMinutes() + ':' + last.getSeconds();

    this._http.syncProducts(updatedFormat).then(

      data => {
        
        if(Object.keys(data).length == 0) return;

        this.inventory.sync(data);

        let not = {
          status: 200,
          title: 'Inventario Sincronizado',
          description: 'Se han sincronizado #' + data.length + ' productos'
        };

        localStorage.setItem('request', JSON.stringify(not));

      },

      error => {


        clearInterval(this.syncInventoryInterval);
      }

    );
  }

}
