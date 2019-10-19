import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private userProfileSub: Subscription;
  public user: object;

  constructor(
    private _user: UserService
    ) { }

  ngOnInit() {
    this.userProfileSub = this._user.userProfile.subscribe(u => this.user = u);
  }

  ngOnDestroy() {
    this.userProfileSub.unsubscribe();
  }

}
