import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user: object;

  constructor(
    private _user: UserService
    ) { }

  ngOnInit() {
    this._user.userProfile.subscribe(u => this.user = u);
  }

}
