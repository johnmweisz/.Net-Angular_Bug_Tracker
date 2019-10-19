import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private errorSub: Subscription;
  public Email: string;
  public Password: string;
  public errors: object;

  constructor(
    private _user: UserService,
    private _router: Router
    ) {}

  ngOnInit() {
    this._user.clearErrors();
    this._user.checkLog(true);
    this.errorSub = this._user.userErrors.subscribe(e => this.errors = e);
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  login() {
    const tryUser = {
      Email: this.Email,
      Password: this.Password,
    };
    return this._user.login(tryUser);
  }

}
