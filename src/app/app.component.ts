import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('loaderImg', [
      
      state('initial', style({
        transform: 'translate3d(0,80%,0) scale(.7)',
        // transform: "scale(.7)",
        // opacity: 0
      })),

      state('final' ,style({
        transform: 'translate3d(0,0,0) scale(1)',
        // scale: "1"
        // opacity: 1
      })),

      transition('initial <=> final' , animate('1000ms ease-out')),
    ])

  ]
})
export class AppComponent {
  
  stateLoaderImg: string;

  userSignin:boolean;

  appView(){

  }

  ngOnInit(){
      this.stateLoaderImg = "initial";
      setTimeout(function(){ 
        this.stateLoaderImg = (this.stateLoaderImg === 'initial' ? 'final' : 'initial');
        console.log(this.stateLoaderImg);
      }, 2000);
      
      // this.stateLoaderImg = "final";
  }
}
