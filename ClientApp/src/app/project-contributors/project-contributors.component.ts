import { ContributorService } from './../services/contributor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project, Contributor } from '../models';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-contributors',
  templateUrl: './project-contributors.component.html',
  styleUrls: ['./project-contributors.component.css']
})
export class ProjectContributorsComponent implements OnInit, OnDestroy {
  private projectSub: Subscription;
  private ContributorId: number;
  private Authorized = 0;
  public UserId: number;
  public project: Project;
  public isContributor = false;
  public isAuthorized = false;
  public isAdmin = false;

  constructor(
    private _project: ProjectService,
    private _contributor: ContributorService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.UserId = JSON.parse(localStorage.getItem('user')).UserId;
    }
    this.projectSub = this._project.aProject.subscribe(p => {
      this.project = p;
      if (this.project) {
        this.checkAccess(p);
        if (!this.isAdmin) {
          return this._router.navigate(['/']);
        }
      }
    });
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }

  authorize(ContributorId: number) {
    if (this.isAdmin) {
      return this._contributor.authorize(ContributorId);
    }
  }

  deauthorize(ContributorId: number) {
    if (this.isAdmin) {
      return this._contributor.deauthorize(ContributorId);
    }
  }

  delete(ContributorId: number = this.ContributorId) {
    if (this.isContributor || this.isAdmin) {
      return this._contributor.delete(ContributorId);
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
        this.ContributorId = c.ContributorId;
        this.isContributor = true;
        if (c.Authorized === 1) {
          this.isAuthorized = true;
        } else {
          this.isAuthorized = false;
        }
        return;
      }
    }
    this.isContributor = false;
    this.isAuthorized = false;
    this.ContributorId = null;
  }

}
