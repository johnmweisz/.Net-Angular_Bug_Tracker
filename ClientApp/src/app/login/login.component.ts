import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Email: string;
  Password: string;
  errors: object;

  constructor(
    private _user: UserService,
    private _router: Router
    ) {}

  ngOnInit() {
    this._user.clearErrors();
    this._user.checkLog(true);
    this._user.userErrors.subscribe(e => this.errors = e);
  }

  login() {
    const tryUser = {
      Email: this.Email,
      Password: this.Password,
    };
    return this._user.login(tryUser);
  }

}
