import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public user: User;
  public FirstName: string;
  public LastName: string;
  public Email: string;
  public Password: string;
  public Confirm: string;
  public errors: object;

  constructor(
    private _user: UserService
    ) { }

  ngOnInit() {
    this._user.userProfile.subscribe(u => this.user = u);
    this.FirstName = this.user.FirstName;
  }

  editUser() {
    const editUser = {
      FirstName: this.FirstName,
      LastName: this.LastName,
      Email: this.Email,
      Password: this.Password,
      Confirm: this.Confirm
    };
    return this._user.editUser(editUser);
  }

}
