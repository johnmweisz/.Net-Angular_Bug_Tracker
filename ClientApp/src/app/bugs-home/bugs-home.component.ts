import { BugService } from './../services/bug.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Subscription } from 'rxjs';
import { Project, Bug } from '../models';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-bugs-home',
  templateUrl: './bugs-home.component.html',
  styleUrls: ['./bugs-home.component.css']
})
export class BugsHomeComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  private projectSub: Subscription;
  public project: Project;
  public UserId: number;
  public isAuthorized = false;
  public isAdmin = false;
  public isPublic = false;

  constructor(
    private _project: ProjectService,
    private _bug: BugService,
    private _route: ActivatedRoute,
    private _router: RouterService
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.UserId = JSON.parse(localStorage.getItem('user')).UserId;
    }
    this.paramsSub = this._route.params.subscribe(par => {
      this._router.setRoute(`/bugs/${par.ProjectId}`);
      this._project.getOne(par.ProjectId);
      }
    );
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
    this._bug.clearBugs();
    this.paramsSub.unsubscribe();
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
