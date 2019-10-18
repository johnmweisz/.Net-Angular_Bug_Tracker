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
        this._user.getProfile(params.UserId);
        this._user.userProfile.subscribe(u => {
          this.user = u;
          console.log(u); // obviously take this out when done.
        });
      },
      error => {
        console.error(error);
      }
    );
  }

}
