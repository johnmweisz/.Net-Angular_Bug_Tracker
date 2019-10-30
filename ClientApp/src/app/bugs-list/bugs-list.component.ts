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
  public UserId: number;
  public isAuthorized = false;
  public isAdmin = false;
  public isPublic = false;

  constructor(
    private _project: ProjectService,
    private _bug: BugService
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.UserId = JSON.parse(localStorage.getItem('user')).UserId;
      this.projectSub = this._project.aProject.subscribe(p => {
        this.project = p;
        if (this.project) {
          if (p.Public === 1) {
            this.isPublic = true;
          } else {
            this.isPublic = false;
          }
          this.checkAccess(p);
          if (this.isPublic || this.isAuthorized || this.isAdmin) {
            this._bug.getAll(p.ProjectId);
            this.bugListSub = this._bug.bugList.subscribe(b => this.bugs = b);
          }
        }
      });
    }
  }

  ngOnDestroy() {
    this.bugListSub.unsubscribe();
    this.projectSub.unsubscribe();
  }

  checkAccess(project: Project) {
    if (project.UserId === this.UserId) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    for (const c of project.Contributors) {
      if (c.UserId === this.UserId) {
        if (c.Authorized === 1) {
          this.isAuthorized = true;
        } else {
          this.isAuthorized = false;
        }
        return;
      }
    }
    this.isAuthorized = false;
  }

}
