import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../models';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects-contributed',
  templateUrl: './projects-contributed.component.html',
  styleUrls: ['./projects-contributed.component.css']
})
export class ProjectsContributedComponent implements OnInit, OnDestroy {
  private projectListSub: Subscription;
  public projects: Project[];

  constructor(
    private _projects: ProjectService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      this._projects.getContributed(JSON.parse(localStorage.getItem('user')).UserId);
      this.projectListSub = this._projects.projectList.subscribe(p => this.projects = p);
    } else {
      this._router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.projectListSub.unsubscribe();
  }

}
