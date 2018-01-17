import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { EmploymentService } from './employment.service';
import { Router } from '@angular/router';
import { Storage } from '../storage';

@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.css']
})
export class EmploymentComponent implements OnInit {
  public search: string;
  public users: Array<User>;

  constructor(private _http: EmploymentService, private router: Router) { 
    _http.getUsers().then(
      data => this.users = data,
      error => console.log(error)
    );
  }

  ngOnInit() {
  }

}
