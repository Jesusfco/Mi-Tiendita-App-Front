import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { User } from '../user';
import { Shop } from '../shop';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User =  new User();
  public shop: Shop =  new Shop();

  form = {
    userForm: false,
    shopForm: true,

  }

  constructor(private _http: RegisterService) { }

  ngOnInit() {

    this._http.test().then(
      data => alert(data),
      error => console.log(error)
    );

  }

  shopForm(){
    this.form.shopForm = false;
    this.form.userForm = true;
  }
  userForm(){
    this._http.postNewShop({shop: this.shop, user: this.user}).then(
      data => console.log(data),
      error => console.log(error)
    )

  }

}
