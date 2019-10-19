import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  private userProfileSub: Subscription;
  private UserId: number;
  public user: User;
  public FirstName: string;
  public LastName: string;
  public Email: string;
  public errors: object;

  constructor(
    private _user: UserService
    ) { }

  ngOnInit() {
    this.userProfileSub = this._user.userProfile.subscribe(u => this.user = u);
    this.UserId = this.user.UserId;
    this.FirstName = this.user.FirstName;
    this.LastName = this.user.LastName;
    this.Email = this.user.Email;
  }

  ngOnDestroy() {
    this.userProfileSub.unsubscribe();
  }

  editUser() {
    const editUser = {
      UserId: this.UserId,
      FirstName: this.FirstName,
      LastName: this.LastName,
      Email: this.Email
    };
    return this._user.editUser(editUser);
  }

  deleteUser() {
    this._user.deleteUser(this.UserId);
  }

}
