import { ContributorService } from './../services/contributor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project, Contributor } from '../models';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  private projectSub: Subscription;
  private ProjectId: number;
  private ContributorId: number;
  private Authorized = 0;
  public UserId: number;
  public project: Project;
  public isContributor = false;
  public isAuthorized = false;
  public isAdmin = false;

  constructor(
    private _project: ProjectService,
    private _contributor: ContributorService
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.UserId = JSON.parse(localStorage.getItem('user')).UserId;
    }
    this.projectSub = this._project.aProject.subscribe(p => {
      this.project = p;
      if (this.project) {
        this.ProjectId = p.ProjectId;
        this.checkAccess(p);
        if (p.Public === 1 || this.isAdmin) {
          this.Authorized = 1;
        } else {
          this.Authorized = 0;
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

  addContributor() {
    const newContributor: Contributor = {
      UserId: this.UserId,
      ProjectId: this.ProjectId,
      Authorized: this.Authorized
    };
    if (!this.isContributor && this.UserId) {
      return this._contributor.add(newContributor);
    }
  }

  delete() {
    if (this.isContributor || this.isAdmin) {
      return this._contributor.delete(this.ContributorId);
    }
  }

}
