import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { Http } from '@angular/http';

import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { LoginService } from './login/login.service';
import { Storage } from './storage';


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

  localData: Storage = new Storage();
  userSignin:boolean;

  appView(){
    this.userSignin = true;
  }

  constructor(private _http: LoginService){
    
  }
  ngOnInit(){

    setTimeout(() => {
      this.loaderAnimationImg();
      this.checkLogin();
    }, 500);
      
  
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
    if(this.localData.token == null || this.localData.token == ''){ 
      this.userSignin = false;
      setTimeout(() => {
        this.loaderAnimation();        
      }, 1000);
    }
    
        else {
          
          this._http.checkAuth().then(
            data => {          
              
              localStorage.setItem('userName', data.user.name);
              localStorage.setItem('userId', data.user.id);
              localStorage.setItem('userEmail', data.user.email);
              localStorage.setItem('userPhone', data.user.phone);
              localStorage.setItem('userShopId', data.user.shop_id);
              localStorage.setItem('userType', data.user.user_type);
              localStorage.setItem('userActive', data.user.active);

              setTimeout(() => {
                this.userSignin = true;
                this.loaderAnimation();        
              }, 1000);
              
              
            },
            error =>  {
              console.log(error);
              this.userSignin = false;
            }
          );
    
        }
  }
}
