import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
    private _user: UserService,
    private _router: Router
    ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.userProfileSub = this._user.userProfile.subscribe(u => {
        this.user = u;
        if (this.user) {
          if (JSON.parse(localStorage.getItem('user')).UserId !== u.UserId) {
            this.UserId = u.UserId;
            this.FirstName = u.FirstName;
            this.LastName = u.LastName;
            this.Email = u.Email;
          } else {
            return this._router.navigate(['/']);
          }
        }
      });
    } else {
      return this._router.navigate(['/']);
    }

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
