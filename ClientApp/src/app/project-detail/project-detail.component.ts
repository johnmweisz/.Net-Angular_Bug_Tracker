import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../models';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  private projectSub: Subscription;
  public project: Project;

  constructor(
    private _project: ProjectService
  ) { }

  ngOnInit() {
    this.projectSub = this._project.aProject.subscribe(p => this.project = p);
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }

}
