import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '../storage';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('focus') private elementRef: ElementRef;
  
  @Output() login = new EventEmitter();

  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }

  data: any = {
    email: '',
    password: null
  };
  form = {
    email: 0,
    password: 0,
    form: 0,
  };

  sendingData: boolean = false;

  storage: Storage =  new Storage();

  constructor(private _http:  LoginService, private router: Router) { }

  ngOnInit() {
    this.ngAfterViewInit();
  }
  accesar() {

    this.sendingData = true;

    this.form.form == 0;
    this.validateMail();
    this.validatePassword();

    if(this.form.form == 1)  return; 

    this._http.login(this.data).then(
      data => {
        this.storage.storageToken(data.token);
        this.storage.storageUserData(data.user);
        this.storage.storeCash(data.shop);
        this.storage.storageInventory(data.inventory);
        this.router.navigate(['/inventory']);
      },
      error => {
        console.log(error);
        this.sendingData = false;
      }
    );
  }
  
  checkAuth() {
    this._http.checkAuth().then(
      data => console.log(data),
      error => console.log(error)
    );  
  }

  validateMail(){
    this.form.email = 0;
    if(this.data.email == null || this.data.email == '') {
      this.form.email = 1;
      this.form.form = 1;
    }    
  }

  validatePassword(){
    this.form.password = 0;
    if(this.data.password == null || this.data.password == '') {
      this.form.password = 1;
      this.form.form = 1;
    }
  }
  

}
