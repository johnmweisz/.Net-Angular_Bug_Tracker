import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private errorSub: Subscription;
  public errors: User;
  public FirstName: string;
  public LastName: string;
  public Email: string;
  public Password: string;
  public Confirm: string;

  constructor(
    private _user: UserService
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
    const newUser: User = {
      FirstName: this.FirstName,
      LastName: this.LastName,
      Email: this.Email,
      Password: this.Password,
      Confirm: this.Confirm
    };
    return this._user.register(newUser);
  }

}
