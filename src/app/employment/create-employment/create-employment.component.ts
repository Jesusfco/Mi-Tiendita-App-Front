import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { EmploymentService } from '../employment.service';
import { Router } from '@angular/router';
import { Storage } from '../../storage';
import { cardPop, backgroundOpacity } from '../../animations';

@Component({
  selector: 'app-create-employment',
  templateUrl: './create-employment.component.html',
  styleUrls: ['./create-employment.component.css'],
  animations: [ cardPop, backgroundOpacity ]
})
export class CreateEmploymentComponent implements OnInit {

  public user: User = new User();

  validateUser = {
    validate: true,
    name: 0,
    email: 0,
    phone: 0,
    password: 0,
  };

  userTypes = [
    {
      value: 2,
      view: 'Administrador'
    },{
      value: 1,
      view: 'Cajero'
    }
  ];

  formAvaible = true;
  timer = {
    email: 0,
    phone: 0,
  };

  sendingData = false;

  state = {
    background: 'initial',
    card: 'initial',
  }

  constructor(private _http: EmploymentService, private router: Router) {
    this.user.getLimitUser();
   }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);

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

  sendDataUser(){
    this._http.createUser(this.user).then(
      data => {
        this.closePop();
      }, error => {
        console.log(error);
        this.sendingData = false;
      }
    );
  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/employers']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
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
        if(x == 0) this.sendDataUser();
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

}
