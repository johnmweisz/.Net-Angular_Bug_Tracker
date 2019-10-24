import { BugService } from './../services/bug.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Subscription } from 'rxjs';
import { Project, Bug } from '../models';

@Component({
  selector: 'app-bugs-assigned',
  templateUrl: './bugs-assigned.component.html',
  styleUrls: ['./bugs-assigned.component.css']
})
export class BugsAssignedComponent implements OnInit, OnDestroy {
  private projectSub: Subscription;
  private bugListSub: Subscription;
  public project: Project;
  public bugs: Bug[];

  constructor(
    private _project: ProjectService,
    private _bug: BugService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      const UserId = JSON.parse(localStorage.getItem('user')).UserId;
      this.projectSub = this._project.aProject.subscribe(p => {
        this.project = p;
        if (this.project != null) {
          this._bug.getAssigned(UserId, p.ProjectId);
        } else {
          this._bug.getAssigned(UserId);
        }
      });
      this.bugListSub = this._bug.bugList.subscribe(b => this.bugs = b);
    } else {
      this._router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.bugListSub.unsubscribe();
    this.projectSub.unsubscribe();
  }

}
