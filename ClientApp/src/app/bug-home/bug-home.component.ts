import { ProjectService } from './../services/project.service';
import { BugService } from './../services/bug.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bug } from '../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bug-home',
  templateUrl: './bug-home.component.html',
  styleUrls: ['./bug-home.component.css']
})
export class BugHomeComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  private bugSub: Subscription;
  public bug: Bug;
  public canView = false;

  constructor(
    private _bug: BugService,
    private _project: ProjectService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.paramsSub = this._route.params.subscribe(par => this._bug.getOne(par.BugId));
    this.bugSub = this._bug.aBug.subscribe(b => {
      this.bug = b;
      if (this.bug) {
        this._project.getOne(b.ProjectId);
        if (JSON.parse(localStorage.getItem('user')).UserId === this.bug.UserId) {
          this.canView = true;
        }
      }
    });
  }

  ngOnDestroy() {
    this._bug.clearBug();
    this.paramsSub.unsubscribe();
    this.bugSub.unsubscribe();
  }

}
