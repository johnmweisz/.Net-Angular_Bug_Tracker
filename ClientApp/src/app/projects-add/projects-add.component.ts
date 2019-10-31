import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../models';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects-add',
  templateUrl: './projects-add.component.html',
  styleUrls: ['./projects-add.component.css']
})
export class ProjectsAddComponent implements OnInit, OnDestroy {
  private errorSub: Subscription;
  public errors: object;
  public Name: string;
  public Description: string;
  public Status: string;
  public Public: number;
  public URL: string;
  public UserId: number;

  constructor(
    private _project: ProjectService
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.UserId = JSON.parse(localStorage.getItem('user')).UserId;
      this.errorSub = this._project.projectErrors.subscribe(e => this.errors = e);
    }
  }

  ngOnDestroy() {
    this._project.clearErrors();
    if (this.errors) {
      this.errorSub.unsubscribe();
    }
  }

  addProject() {
    const newProject: Project = {
      Name: this.Name,
      Description: this.Description,
      Status: this.Status,
      Public: Number(this.Public),
      URL: this.URL,
      UserId: this.UserId
    };
    return this._project.add(newProject);
  }

}
