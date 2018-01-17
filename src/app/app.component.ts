import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { Http } from '@angular/http';

import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { LoginService } from './login/login.service';
import { Storage } from './storage';
import { Router } from '@angular/router';


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

      state('final' ,style({
        transform: 'translate3d(0,0,0) scale(1)',       
        opacity: 1
      })),      

      transition('initial <=> final' , animate('1000ms ease-out')),
    ]),

    trigger('loader', [
      
      state('initial', style({        
        opacity: 1
      })),

      state('final' ,style({
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

  constructor(private _http: LoginService, private router: Router){}

  ngOnInit(){

    // console.log(navigator.connection);
    setTimeout(() => {
      
      this.loaderAnimationImg();      
      
      if(this.storage.token == null || this.storage.token == ''){  
      
        if(this.router.url !== '/register'){
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
        if(data.user.cash == undefined)
          this.storage.storeCash(data.shop);

        this.storage.storeServiceData(data.service);

        this.storeInventoryHttp();

        
          
        setTimeout(() => {

          this.loaderAnimation();
          if(this.router.url == '/login' || this.router.url == '/register'){
            this.router.navigate(['/sale-point']);
          }
        }, 800);
      },
      error =>  {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        console.log(error);
        setTimeout(() => {
          
          this.loaderAnimation();

        }, 800);

      }
    );

  }

  storeInventoryHttp(){
    this._http.getProducts().then(
      data => {
        
        this.storage.storageInventory(data);
        
      },
      error => console.log(error)
    );
  }
  
}
