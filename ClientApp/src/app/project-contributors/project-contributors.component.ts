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

  constructor(
    private _project: ProjectService
  ) { }

  ngOnInit() {
    this.projectSub = this._project.aProject.subscribe(p => {
      this.project = p;
      if (this.project) {
        this.checkContributor();
        if (this.project.Public === 0) {
          this.isPrivate = false;
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

}
