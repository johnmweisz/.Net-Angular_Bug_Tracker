import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BugService } from './../services/bug.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bug } from '../models';

@Component({
  selector: 'app-bugs-assigned',
  templateUrl: './bugs-assigned.component.html',
  styleUrls: ['./bugs-assigned.component.css']
})
export class BugsAssignedComponent implements OnInit, OnDestroy {
  private bugListSub: Subscription;
  public bugs: Bug[];

  constructor(
    private _bugs: BugService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      this._bugs.getAssigned(JSON.parse(localStorage.getItem('user')).UserId);
      this.bugListSub = this._bugs.bugList.subscribe(b => this.bugs = b);
    } else {
      this._router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.bugListSub.unsubscribe();
  }

}
