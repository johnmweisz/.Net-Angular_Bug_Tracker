import { Bug, Project } from './../models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BugService } from '../services/bug.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-bug-edit',
  templateUrl: './bug-edit.component.html',
  styleUrls: ['./bug-edit.component.css']
})
export class BugEditComponent implements OnInit, OnDestroy {
  private projectSub: Subscription;
  private errorSub: Subscription;
  private bugSub: Subscription;
  public project: Project;
  public errors: object;
  public bug: Bug;
  public Subject: string;
  public Description: string;
  public Priority: string;
  public Status: string;
  public DueDate: Date;
  public BugId: number;
  public UserId: number;
  public ProjectId: number;

  constructor(
    private _bug: BugService,
    private _project: ProjectService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this._bug.clearErrors();
      this.errorSub = this._bug.bugErrors.subscribe(e => this.errors = e);
      this.projectSub = this._project.aProject.subscribe(p => {
        this.project = p;
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
    } else {
      this._router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
    this.projectSub.unsubscribe();
  }

  editBug() {
    const editBug: Bug = {
      Subject: this.Subject,
      Description: this.Description,
      Priority: this.Priority,
      Status: this.Status,
      DueDate: this.DueDate,
      BugId: this.BugId,
      UserId: this.UserId,
      ProjectId: this.project.ProjectId
    };
    return this._bug.editBug(editBug);
  }

}
