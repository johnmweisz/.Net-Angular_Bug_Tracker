import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../models';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  private errorSub: Subscription;
  private projectSub: Subscription;
  public project: Project;
  public errors: object;
  public Name: string;
  public Description: string;
  public Status: string;
  public Public: number;
  public URL: string;
  public UserId: number;
  public ProjectId: number;
  public isAuthorized = false;
  public isAdmin = false;
  public isPublic = false;

  constructor(
    private _project: ProjectService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.UserId = JSON.parse(localStorage.getItem('user')).UserId;
      this.projectSub = this._project.aProject.subscribe(p => {
        this.project = p;
        if (this.project) {
          this.checkAccess(p);
          if (this.isAdmin) {
            this.errorSub = this._project.projectErrors.subscribe(e => this.errors = e);
            this.Name = p.Name;
            this.Description = p.Description;
            this.Status = p.Status;
            this.Public = p.Public;
            this.URL = p.URL;
            this.UserId = p.UserId;
            this.ProjectId = p.ProjectId;
          } else {
            return this._router.navigate(['/']);
          }
        }
      });
    } else {
      return this._router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    if (this.projectSub) {
      this.projectSub.unsubscribe();
    }
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }

  editProject() {
    const editProject: Project = {
      Name: this.Name,
      Description: this.Description,
      Status: this.Status,
      Public: Number(this.Public),
      URL: this.URL,
      UserId: this.project.UserId,
      ProjectId: this.project.ProjectId
    };
    if (this.isAdmin) {
      return this._project.edit(editProject);
    }
  }

  deleteProject() {
    if (this.isAdmin) {
      this._project.delete(this.ProjectId);
    }
  }

  checkAccess(project: Project) {
    if (project.UserId === this.UserId) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    for (const c of project.Contributors) {
      if (c.UserId === this.UserId) {
        if (c.Authorized === 1) {
          this.isAuthorized = true;
        } else {
          this.isAuthorized = false;
        }
        return;
      }
    }
    this.isAuthorized = false;
  }

}
