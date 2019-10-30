import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BugService } from '../services/bug.service';
import { ProjectService } from '../services/project.service';
import { Subscription } from 'rxjs';
import { Project, Bug } from '../models';

@Component({
  selector: 'app-bug-track',
  templateUrl: './bug-track.component.html',
  styleUrls: ['./bug-track.component.css']
})
export class BugTrackComponent implements OnInit, OnDestroy {
  private projectSub: Subscription;
  private updateSub: Subscription;
  private errorSub: Subscription;
  private bugSub: Subscription;
  private updateSub: Subscription;
  private updatesSub: Subscription;
  public project: Project;
  public errors: object;
  public bug: Bug;
  public Status: string;
  public Message: string;
  public BugId: number;
  public UserId: number;
  public isAuthorized = false;
  public isAdmin = false;

  constructor(
    private _bug: BugService,
    private _project: ProjectService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.UserId = JSON.parse(localStorage.getItem('user')).UserId;
    }
    this._update.clearErrors();
    this.errorSub = this._update.updateErrors.subscribe(e => this.errors = e);
    this.projectSub = this._project.aProject.subscribe(p => {
      this.project = p;
      if (this.project) {
        this.checkAccess(p);
      }
    });
    this.bugSub = this._bug.aBug.subscribe(b => {
      this.bug = b;
      if (this.bug) {
        if (JSON.parse(localStorage.getItem('user')).UserId === b.UserId) {
          this.Subject = b.Subject;
          this.Description = b.Description;
          this.Priority = b.Priority;
          this.Status = b.Status;
          this.DueDate = b.DueDate;
          this.BugId = b.BugId;
          this.ProjectId = b.ProjectId;
          this.UserId = b.UserId;
        } else {
          return this._router.navigate(['/']);
        }
      }
    });
  }

  ngOnDestroy() {
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
