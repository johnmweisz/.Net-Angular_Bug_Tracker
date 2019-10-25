import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Subscription } from 'rxjs';
import { Project } from '../models';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.css']
})
export class ProjectHomeComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  private projectSub: Subscription;
  public canView = false;
  public project: Project;

  constructor(
    private _project: ProjectService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.paramsSub = this._route.params.subscribe(par => this._project.getOne(par.ProjectId));
    this.projectSub = this._project.aProject.subscribe(
      p => {
        this.project = p;
        if (this.project && JSON.parse(localStorage.getItem('user')).UserId === this.project.UserId) {
          this.canView = true;
        }
      }
    );
  }

  ngOnDestroy() {
    this._project.clearProject();
    this.paramsSub.unsubscribe();
    this.projectSub.unsubscribe();
  }

}
