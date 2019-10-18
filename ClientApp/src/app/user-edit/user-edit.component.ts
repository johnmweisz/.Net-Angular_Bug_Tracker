import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: object;

  constructor(
    private _user: UserService
    ) { }

  ngOnInit() {
    this._user.userProfile.subscribe(u => this.user = u);
  }

}
