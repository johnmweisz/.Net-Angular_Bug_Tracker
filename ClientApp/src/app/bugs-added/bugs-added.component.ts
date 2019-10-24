import { ProjectService } from './../services/project.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BugService } from './../services/bug.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project, Bug } from '../models';

@Component({
  selector: 'app-bugs-added',
  templateUrl: './bugs-added.component.html',
  styleUrls: ['./bugs-added.component.css']
})
export class BugsAddedComponent implements OnInit, OnDestroy {
  private projectSub: Subscription;
  private bugListSub: Subscription;
  public project: Project;
  public bugs: Bug[];

  constructor(
    private _bugs: BugService,
    private _project: ProjectService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      this.projectSub = this._project.aProject.subscribe(p => {
        this.project = p;
        if (this.project) {
          this._bugs.getAdded(JSON.parse(localStorage.getItem('user')).UserId, this.project.ProjectId);
        } else {
          this._bugs.getAdded(JSON.parse(localStorage.getItem('user')).UserId);
        }
      });
      this.bugListSub = this._bugs.bugList.subscribe(b => this.bugs = b);
    } else {
      this._router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.bugListSub.unsubscribe();
    this.projectSub.unsubscribe();
  }

}
