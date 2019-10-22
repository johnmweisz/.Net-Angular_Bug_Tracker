import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../models';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';

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
  public Public: boolean;
  public URL: string;
  public UserId: number;

  constructor(
    private _projects: ProjectService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user')) === null) {
      this._router.navigate(['/']);
    } else {
      this.UserId = JSON.parse(localStorage.getItem('user'));
    }
    this._projects.clearErrors();
    this.errorSub = this._projects.projectErrors.subscribe(e => this.errors = e);
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  addBug() {
    const newProject: Project = {
      Name: this.Name,
      Description: this.Description,
      Status: this.Status,
      Public: this.Public,
      URL: this.URL,
      UserId: this.UserId
    };
    return this._projects.addProject(newProject);
  }

}
