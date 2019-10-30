import { BugService } from './../services/bug.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Subscription } from 'rxjs';
import { Project, Bug } from '../models';

@Component({
  selector: 'app-bugs-assigned',
  templateUrl: './bugs-assigned.component.html',
  styleUrls: ['./bugs-assigned.component.css']
})
export class BugsAssignedComponent implements OnInit, OnDestroy {
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
    private _bug: BugService,
    private _router: Router
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
            this._bug.getAssigned(this.UserId, p.ProjectId);
            this.bugListSub = this._bug.bugList.subscribe(b => this.bugs = b);
          } else {
            this._router.navigate(['/']);
          }
        }
      });
    } else {
      this._router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    if (this.projectSub) {
      this.projectSub.unsubscribe();
    }
    if (this.bugListSub) {
      this.bugListSub.unsubscribe();
    }
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
