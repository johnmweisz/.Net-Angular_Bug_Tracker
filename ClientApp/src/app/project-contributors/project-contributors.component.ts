import { ContributorService } from './../services/contributor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project, Contributor } from '../models';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-contributors',
  templateUrl: './project-contributors.component.html',
  styleUrls: ['./project-contributors.component.css']
})
export class ProjectContributorsComponent implements OnInit, OnDestroy {
  private projectSub: Subscription;
  private ProjectId: number;
  private UserId: number;
  private ContributorId: number;
  private Authorized = 0;
  public project: Project;
  public isContributor = false;
  public isPrivate = true;

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
        for (const c of this.project.Contributors) {
          if (c.UserId === this.UserId) {
            this.ContributorId = c.ContributorId;
            this.isContributor = true;
          }
        }
        if (this.project.Public === 0) {
          this.isPrivate = false;
          this.Authorized = 1;
        }
      }
    });
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }

  addContributor() {
    const newContributor: Contributor = {
      UserId: this.UserId,
      ProjectId: this.ProjectId,
      Authorized: this.Authorized
    };
    return this._contributor.add(newContributor);
  }

  authorize(ContributorId: number) {
    return this._contributor.authorize(ContributorId);
  }

  deauthorize(ContributorId: number) {
    return this._contributor.deauthorize(ContributorId);
  }

  delete() {
    return this._contributor.delete(this.ContributorId);
  }

}
