import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../models';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  private loginSub: Subscription;
  public isExpanded: boolean;
  public user: User;

  constructor(
    private _user: UserService,
    private _router: Router
    ) {}

  ngOnInit() {
    this.isExpanded = false;
    this._user.checkLog(false);
    this.loginSub = this._user.userLog.subscribe(u => this.user = u);
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this._user.logout();
  }

}
