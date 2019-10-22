import { Subscription } from 'rxjs';
import { BugService } from './../services/bug.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bug } from '../models';

@Component({
  selector: 'app-bugs-list',
  templateUrl: './bugs-list.component.html',
  styleUrls: ['./bugs-list.component.css']
})
export class BugsListComponent implements OnInit, OnDestroy {
  private bugListSub: Subscription;
  public bugs: Bug[];

  constructor(
    private _bugs: BugService
  ) { }

  ngOnInit() {
    this._bugs.getAll();
    this.bugListSub = this._bugs.bugList.subscribe(b => this.bugs = b);
  }

  ngOnDestroy() {
    this.bugListSub.unsubscribe();
  }

}
