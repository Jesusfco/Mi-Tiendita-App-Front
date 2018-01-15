import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { RegisterService } from './register.service';
import { User } from '../user';
import { Shop } from '../shop';
import { Storage } from '../storage';
import { ScaleDownUpAnimation } from '../animations';
// import { setTimeout } from 'timers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [ScaleDownUpAnimation],
})
export class RegisterComponent implements OnInit {

  public user: User = new User();
  public shop: Shop = new Shop();

  scaleStateForm1 = '2';
  scaleStateForm2 = '1';


  form = {
    userForm: false,
    shopForm: true,
  };

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
  };

  timer = {
    email: 0,
    phone: 0,
  };

  storage: Storage =  new Storage();

  sendingData: boolean = false;

  constructor(private _http: RegisterService, private router: Router) { }

  ngOnInit() {

    if(this.storage.token == null || this.storage.token == ''){       
      
    } else {      
      this.router.navigate(['/inventory']);      
    }

  }

  shopForm() {
    this.restoreValidationShop();
    this.validateNameShop();
    if (this.validateShop.validate === false) return;

    this.scaleStateForm1 = '1';

    setTimeout(() => {
      this.form.shopForm = false;
      this.form.userForm = true;

      setTimeout(() => {
        this.scaleStateForm2 = '2';
      }, 10);

    }, 300);

  }

  userForm() {
    this.sendingData = true;
    this.restoreValidationUser();

    this.validateNameUser();
    this.validateEmailUser();
    this.validatePhoneUser();
    this.validatePasswordUser();

    if (this.validateUser.email !== 1 && this.validateUser.phone !== 1)
      this.validateUniqueEmailUser(0);
    else {
      this.sendingData = false;
    }
  }

  sendDataRegister() {
    if (this.validateUser.validate == false){
      this.sendingData = false;
      return;
    } 
    
    this._http.postNewShop({ shop: this.shop, user: this.user }).then(
      data => {
          this.getToken();
        console.log(data);
        
      }, 
      error => {
        console.log(error);
        this.sendingData = false;
      }  
    );
  }

  getToken(){
    this._http.getToken({email: this.user.email, password: this.user.password}).then(
      data => {
        this.storage.storageToken(data.token);
        this.storage.storageUserData(data.user);
        this.storage.storeCash({data: {cash: 0}});
        this.storage.storageInventory(data.inventory);
        this.sendingData = false;
        this.router.navigate(['/inventory']);
      },
      error => {
        console.log(error);
        this.sendingData = false;
      }
    );
  }

  keydownCheckUniqueEmail() {
    this.timer.email++;

    setTimeout(() => {
      this.timer.email--;
    }, 1000);

    setTimeout(() => {

      if (this.timer.email == 0) {

        if (this.user.email != null || this.user.email != '')
          this.validateUniqueEmailUser(1);
      }

    }, 1050);
  }

  keydownCheckUniquePhone(){
    this.timer.phone++;

    setTimeout(() => {
      this.timer.phone--;
    }, 1000);

    setTimeout(() => {

      if (this.timer.phone === 0) {

        if (this.user.phone !== null || this.user.phone !== '')
          this.validateUniquePhoneUser(1);
      }

    }, 1050);
  }

  // VALIDACIONES DE TIENDA
  validateNameShop() {
    if (this.shop.name == null || this.shop.name == '') {
      this.validateShop.name = 1;
      this.validateShop.validate = false;
    }
  }

  // VALIDACIONES de USUARIO

  validateNameUser() {
    if (this.user.name == null || this.user.name == '') {
      this.validateUser.validate = false;
      this.validateUser.name = 1;
    }
  }

  validateEmailUser() {
    if (this.user.email == null || this.user.email == '') {
      this.validateUser.validate = false;
      this.validateUser.email = 1;
    }
  }

  validatePhoneUser() {
    if (this.user.phone == null || this.user.phone == '') {
      this.validateUser.validate = false;
      this.validateUser.phone = 1;
    }
  }

  validatePasswordUser() {
    if (this.user.password == null || this.user.password == '') {
      this.validateUser.validate = false;
      this.validateUser.password = 1;
    }
  }

  validateUniqueEmailUser(x) {
    this._http.uniqueEmail({ email: this.user.email }).then(
      data => {
        if(data == true){
          this.validateUser.email = -1;
        } else {
          this.validateUser.email = 2;
          this.validateUser.validate = false;
        }
                
        if(x == 0) this.validateUniquePhoneUser(0);

      },
      error => console.log(error)
    );
  }

  validateUniquePhoneUser(x) {
    this._http.uniquePhone({ phone: this.user.phone }).then(
      data => {
        if(data == true)
          this.validateUser.phone = -1;
        else {
          this.validateUser.phone = 2;
          this.validateUser.validate = false;
        }        
        if(x == 0) this.sendDataRegister();
      },
      error => console.log(error)
    );
  }

  // RESTAURACION DE VALIDACIONES

  restoreValidationUser() {
    this.validateUser = {
      validate: true,
      name: 0,
      email: 0,
      phone: 0,
      password: 0,
    }
  }

  restoreValidationShop() {
    this.validateShop = {
      validate: true,
      name: 0,
    };
  }

}
