import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../models';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  private projectListSub: Subscription;
  public projects: Project[];

  constructor(
    private _projects: ProjectService
  ) { }

  ngOnInit() {
    this._projects.getAll();
    this.projectListSub = this._projects.projectList.subscribe(p => this.projects = p);
  }

  ngOnDestroy() {
    this.projectListSub.unsubscribe();
  }

}
