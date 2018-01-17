import { Component, OnInit } from '@angular/core';
import { Shop } from '../shop';
import { User } from '../user';
import { Storage } from '../storage';
import { PerfilService } from './perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  caja: number = 0;
  public storage: Storage = new Storage();

  constructor(private _http: PerfilService, private router: Router) {
    this.caja = parseInt(this.storage.getCash());
   }

  ngOnInit() {
  }

  cashSubmit(){
    this._http.updateGlobalCash(this.caja).then(
      data => this.storage.storeCash({cash: this.caja}),
      error => console.log(error)
    );
  }

}
