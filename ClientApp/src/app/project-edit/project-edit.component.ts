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

  constructor(
    private _project: ProjectService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user')) == null) {
      return this._router.navigate(['/']);
    }
    this.projectSub = this._project.aProject.subscribe(p => {
      this.project = p;
      if (this.project) {
        this.Name = p.Name;
        this.Description = p.Description;
        this.Status = p.Status;
        this.Public = p.Public;
        this.URL = p.URL;
        this.UserId = p.UserId;
        this.ProjectId = p.ProjectId;
      }
    });
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
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
    return this._project.editProject(editProject);
  }

  deleteProject() {
    this._project.deleteProject(this.ProjectId);
  }

}
