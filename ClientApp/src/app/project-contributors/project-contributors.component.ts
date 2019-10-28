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
  public project: Project;
  public isContributor = false;
  public isPrivate = true;
  public ProjectId: number;
  public UserId: number;
  public Authorized = 0;
  public ContributorId: number;

  constructor(
    private _project: ProjectService,
    private _contributor: ContributorService
  ) { }

  ngOnInit() {
    this.projectSub = this._project.aProject.subscribe(p => {
      this.project = p;
      if (this.project) {
        this.checkContributor();
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

  checkContributor() {
    for (const c of this.project.Contributors) {
      if (c.UserId === JSON.parse(localStorage.getItem('user')).UserId) {
        this.isContributor = true;
      }
    }
  }

  addContributor() {
    const newContributor: Contributor = {
      UserId: this.UserId,
      ProjectId: this.ProjectId,
      Authorized: this.Authorized
    };
    return this._contributor.add(newContributor);
  }

}
