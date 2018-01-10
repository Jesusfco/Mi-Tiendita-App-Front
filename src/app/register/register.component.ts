import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { RegisterService } from './register.service';
import { User } from '../user';
import { Shop } from '../shop';
import { ScaleDownUpAnimation } from '../animations';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [ScaleDownUpAnimation],
})
export class RegisterComponent implements OnInit {

  public user: User =  new User();
  public shop: Shop =  new Shop();

  scaleStateForm1 = '2';
  scaleStateForm2 = '1';


  form = {
    userForm: false,
    shopForm: true,
  }

  validateShop = {
    validate: true,
    name: 0,
  };

  validateUser = {
    validate: true,
    name: 0,
    email: 0,
    phone: 0,
    password: 0,
  }

  constructor(private _http: RegisterService) { }

  ngOnInit() {

   

  }

  shopForm(){
    this.scaleStateForm1 = '1';

    setTimeout(() => {
      this.form.shopForm = false;
      this.form.userForm = true;      

      setTimeout(() => {        
        this.scaleStateForm2 = '2';
      }, 10);

    }, 300);
   
  }
  userForm(){
    this._http.postNewShop({shop: this.shop, user: this.user}).then(
      data => console.log(data),
      error => console.log(error)
    )

  }
  // VALIDACIONES DE TIENDA
  validateNameShop(){
    if(this.shop.name == null || this.shop.name == ''){
      this.validateShop.name = 1 ;
      this.validateShop.validate = false;
    }
  }

  // VALIDACIONES de USUARIO

  validateNameUser(){
    if(this.user.name == null || this.user.name == ''){
      this.validateUser.validate = false;
      this.validateUser.name = 1;
    }
  }

  validateEmailUser(){
    if(this.user.email == null || this.user.email == ''){
      this.validateUser.validate = false;
      this.validateUser.email = 1;
    }  
  }

  validatePhoneUser(){
    if(this.user.phone == null || this.user.phone == ''){
      this.validateUser.validate = false;
      this.validateUser.phone = 1;
    }
  }

  validatePasswordUser(){
    if(this.user.password == null || this.user.password == ''){
      this.validateUser.validate = false;
      this.validateUser.password = 1;
    }
  }

  validateUniqueEmailUser(){
    this._http.uniqueEmail({email: this.user.email}).then(
      data => this.validateUser.email = -1,
      error => {
        this.validateUser.email = 2;
        this.validateUser.validate = false;
      }
    )
  }

  validateUniquePhoneUser(){
    this._http.uniquePhone({phone: this.user.phone}).then(
      data => this.validateUser.phone = -1,
      error => {
        this.validateUser.phone = 2;
        this.validateUser.validate = false;
      }
    )
  }

  // RESTAURACION DE VALIDACIONES

  restoreValidationUser(){
    this.validateUser = {
      validate: true,
      name: 0,
      email: 0,
      phone: 0,
      password: 0,
    }
  }

  restoreValidationShop(){
    this.validateShop = {
      validate: true,
      name: 0,
    };
  }

}
