import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../models';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects-added',
  templateUrl: './projects-added.component.html',
  styleUrls: ['./projects-added.component.css']
})
export class ProjectsAddedComponent implements OnInit, OnDestroy {
  private projectListSub: Subscription;
  public projects: Project[];
  public UserId: number;

  constructor(
    private _project: ProjectService
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.UserId = JSON.parse(localStorage.getItem('user')).UserId;
      this._project.getAdded(this.UserId);
      this.projectListSub = this._project.projectList.subscribe(p => this.projects = p);
    }
  }

  ngOnDestroy() {
    if (this.projectListSub) {
      this.projectListSub.unsubscribe();
    }
  }

}
