import { BugService } from './../services/bug.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Subscription } from 'rxjs';
import { Project, Bug } from '../models';

@Component({
  selector: 'app-bugs-home',
  templateUrl: './bugs-home.component.html',
  styleUrls: ['./bugs-home.component.css']
})
export class BugsHomeComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  public canView = false;
  public ProjectId: Project;

  constructor(
    private _project: ProjectService,
    private _bug: BugService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.paramsSub = this._route.params.subscribe(par => {
      this.ProjectId = par.ProjectId;
      this._project.getOne(par.ProjectId);
      }
    );
    if (JSON.parse(localStorage.getItem('user')) != null) {
      this.canView = true;
    }
  }

  ngOnDestroy() {
    this._bug.clearBugs();
    this.paramsSub.unsubscribe();
  }

}
