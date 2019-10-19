import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  public user: object;

  constructor(
    private _user: UserService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.paramsSub = this._route.params.subscribe(
      par => this._user.getProfile(par.UserId),
      err => console.error(err)
    );
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
