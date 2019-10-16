import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded: boolean;
  user: object;

  constructor(
    private _user: UserService,
    private _router: Router
    ) {}

  ngOnInit() {
    this.isExpanded = false;
    this._user.checkLog(false);
    this._user.userLog.subscribe(u => this.user = u);
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
