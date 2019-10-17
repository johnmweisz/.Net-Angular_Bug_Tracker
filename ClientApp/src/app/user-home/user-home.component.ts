import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  user: object;

  constructor(
    private _user: UserService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe(
      params => {
        this._user.userProfile.subscribe(u => this.user = u);
        this._user.getProfile(params.UserId);
        console.log(this.user);
      },
      error => {
        console.error(error);
      }
    );
  }

}
