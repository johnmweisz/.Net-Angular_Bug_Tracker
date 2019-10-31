import { UpdateService } from './../services/update.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BugService } from '../services/bug.service';
import { ProjectService } from '../services/project.service';
import { Subscription } from 'rxjs';
import { Project, Bug, Update } from '../models';

@Component({
  selector: 'app-bug-track',
  templateUrl: './bug-track.component.html',
  styleUrls: ['./bug-track.component.css']
})
export class BugTrackComponent implements OnInit, OnDestroy {
  private projectSub: Subscription;
  private errorSub: Subscription;
  private bugSub: Subscription;
  private updatesSub: Subscription;
  private updateSub: Subscription;
  public project: Project;
  public errors: object;
  public bug: Bug;
  public updates: Update[];
  public update: Update;
  public Status: string;
  public Message: string;
  public BugId: number;
  public UserId: number;
  public isAuthorized = false;
  public isAdmin = false;
  public isPublic = false;

  constructor(
    private _bug: BugService,
    private _project: ProjectService,
    private _update: UpdateService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.UserId = JSON.parse(localStorage.getItem('user')).UserId;
    }
    this._update.clearErrors();
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
          this.updatesSub = this._update.updateList.subscribe(u => this.updates = u);
          this.updateSub = this._update.aUpdate.subscribe(u => this.update = u);
          this.errorSub = this._update.updateErrors.subscribe(e => this.errors = e);
          this.bugSub = this._bug.aBug.subscribe(b => {
            this.bug = b;
            if (this.bug) {
              this.BugId = b.BugId;
              this._update.getAll(b.BugId);
            }
          });
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.projectSub) {
      this.projectSub.unsubscribe();
    }
    if (this.updatesSub) {
      this.updatesSub.unsubscribe();
    }
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
    if (this.bugSub) {
      this.bugSub.unsubscribe();
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

  add() {
    const newUpdate: Update = {
      Status: this.Status,
      Message: this.Message,
      UserId: this.UserId,
      BugId: this.BugId
    };
    if (this.isAdmin || this.isAuthorized) {
      return this._update.add(newUpdate);
    }
  }

  delete(UpdateId: number) {
    this._update.getOne(UpdateId);
    if (this.isAdmin || this.isAuthorized && this.update && this.update.UserId === this.UserId) {
      return this._update.delete(UpdateId);
    }
  }

}
