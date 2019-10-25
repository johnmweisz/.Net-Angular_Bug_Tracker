import { Subscription } from 'rxjs';
import { BugService } from './../services/bug.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bug, Project } from '../models';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-bugs-list',
  templateUrl: './bugs-list.component.html',
  styleUrls: ['./bugs-list.component.css']
})
export class BugsListComponent implements OnInit, OnDestroy {
  private projectSub: Subscription;
  private bugListSub: Subscription;
  public project: Project;
  public bugs: Bug[];

  constructor(
    private _project: ProjectService,
    private _bug: BugService
  ) { }

  ngOnInit() {
    this.projectSub = this._project.aProject.subscribe(p => {
      this.project = p;
      if (this.project) {
        this._bug.getAll(p.ProjectId);
      } else {
        this._bug.getAll();
      }
    });
    this.bugListSub = this._bug.bugList.subscribe(b => this.bugs = b);
  }

  ngOnDestroy() {
    this.bugListSub.unsubscribe();
    this.projectSub.unsubscribe();
  }

}
