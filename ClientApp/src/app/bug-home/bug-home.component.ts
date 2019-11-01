import { UpdateService } from './../services/update.service';
import { ProjectService } from './../services/project.service';
import { BugService } from './../services/bug.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bug, Project } from '../models';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-bug-home',
  templateUrl: './bug-home.component.html',
  styleUrls: ['./bug-home.component.css']
})
export class BugHomeComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  private bugSub: Subscription;
  private projectSub: Subscription;
  public project: Project;
  private UserId: number;
  public bug: Bug;
  public isAuthorized = false;
  public isAdmin = false;
  public isPublic = false;
  public isCreator = false;

  constructor(
    private _bug: BugService,
    private _project: ProjectService,
    private _update: UpdateService,
    private _route: ActivatedRoute,
    private _router: RouterService
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.UserId = JSON.parse(localStorage.getItem('user')).UserId;
    }
    this.paramsSub = this._route.params.subscribe(par => {
      this._router.setRoute(`/bug/${par.BugId}`);
      this._bug.getOne(par.BugId);
    });
    this.bugSub = this._bug.aBug.subscribe(b => {
      this.bug = b;
      if (this.bug) {
        if (b.UserId === this.UserId) {
          this.isCreator = true;
        } else {
          this.isCreator = false;
        }
        this._project.getOne(b.ProjectId);
      }
    });
    this.projectSub = this._project.aProject.subscribe(p => {
      this.project = p;
      if (this.project) {
        if (p.Public === 1) {
          this.isPublic = true;
        } else {
          this.isPublic = false;
        }
        this.checkAccess(p);
      }
    });
  }

  ngOnDestroy() {
    this._update.clearUpdate();
    this._bug.clearBug();
    this.paramsSub.unsubscribe();
    this.bugSub.unsubscribe();
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

  goBack() {
    this._router.goBack();
  }

}
