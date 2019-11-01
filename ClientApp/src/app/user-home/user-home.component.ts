import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  public canView = false;
  private UserId: number;

  constructor(
    private _user: UserService,
    private _route: ActivatedRoute,
    private _router: RouterService
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.UserId = JSON.parse(localStorage.getItem('user')).UserId;
    }
    this.paramsSub = this._route.params.subscribe(
      par => {
        this._user.getProfile(par.UserId);
        this._router.setRoute(`/user/${par.UserId}`);
        if (JSON.parse(par.UserId) === this.UserId) {
          this.canView = true;
        }
      },
      err => console.error(err)
    );
  }

  ngOnDestroy() {
    this._user.clearProfile();
    this.paramsSub.unsubscribe();
  }

  goBack() {
    this._router.goBack();
  }

}
