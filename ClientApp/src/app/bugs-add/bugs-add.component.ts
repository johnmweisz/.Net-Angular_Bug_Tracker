import { Bug, Project } from './../models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BugService } from '../services/bug.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-bugs-add',
  templateUrl: './bugs-add.component.html',
  styleUrls: ['./bugs-add.component.css']
})
export class BugsAddComponent implements OnInit, OnDestroy {
  private projectSub: Subscription;
  private errorSub: Subscription;
  public errors: object;
  public Subject: string;
  public Description: string;
  public Priority: string;
  public Status: string;
  public DueDate: Date;
  public UserId: number;
  public project: Project;
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
      this.projectSub = this._project.aProject.subscribe(p => {
        this.project = p;
        if (this.project) {
          this.checkAccess(p);
          if (this.isAuthorized || this.isAdmin) {
            this._bug.clearErrors();
            this.errorSub = this._bug.bugErrors.subscribe(e => this.errors = e);
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
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }

  addBug() {
    const newBug: Bug = {
      Subject: this.Subject,
      Description: this.Description,
      Priority: this.Priority,
      Status: this.Status,
      DueDate: this.DueDate,
      UserId: this.UserId,
      ProjectId: this.project.ProjectId
    };
    return this._bug.add(newBug);
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
