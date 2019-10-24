import { Bug } from './../models';
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
  public ProjectId: number;

  constructor(
    private _bug: BugService,
    private _project: ProjectService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.UserId = JSON.parse(localStorage.getItem('user')).UserId;
      this._bug.clearErrors();
      this.errorSub = this._bug.bugErrors.subscribe(e => this.errors = e);
      this.errorSub = this._project.aProject.subscribe(p => this.ProjectId = p.ProjectId);
    } else {
      this._router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
    this.projectSub.unsubscribe();
  }

  addBug() {
    const newBug: Bug = {
      Subject: this.Subject,
      Description: this.Description,
      Priority: this.Priority,
      Status: this.Status,
      DueDate: this.DueDate,
      UserId: this.UserId,
      ProjectId: this.ProjectId
    };
    return this._bug.addBug(newBug);
  }

}
