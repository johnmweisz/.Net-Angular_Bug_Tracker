import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private errorSub: Subscription;
  public FirstName: string;
  public LastName: string;
  public Email: string;
  public Password: string;
  public Confirm: string;
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

  register() {
    const newUser = {
      FirstName: this.FirstName,
      LastName: this.LastName,
      Email: this.Email,
      Password: this.Password,
      Confirm: this.Confirm
    };
    return this._user.register(newUser);
  }

}
