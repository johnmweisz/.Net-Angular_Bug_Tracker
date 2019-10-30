import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Project } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private errorSub = new BehaviorSubject<object>(null);
  private projectsSub = new BehaviorSubject<Project[]>(null);
  private projectSub = new BehaviorSubject<Project>(null);
  public projectErrors = this.errorSub.asObservable();
  public projectList = this.projectsSub.asObservable();
  public aProject = this.projectSub.asObservable();

  constructor(
    private _http: HttpClient,
    private _router: Router
    ) { }

  private parseErrors(err: object) {
    const errors = {};
    for (const key in err['error']) {
      if (err['error'].hasOwnProperty(key)) {
        errors[key] = err['error'][key].Errors[0].ErrorMessage;
      }
    }
    this.errorSub.next(errors);
  }

  clearErrors() {
    this.errorSub.next(null);
  }

  clearProjects() {
    this.projectsSub.next(null);
  }

  clearProject() {
    this.projectSub.next(null);
  }

  getAll() {
    return this._http.get('/Project/GetAll').subscribe(
      (res: Project[]) => this.projectsSub.next(res),
      err => console.log(err)
    );
  }

  getAdded(UserId: number) {
    return this._http.get(`/Project/GetAdded/${UserId}`).subscribe(
      (res: Project[]) => this.projectsSub.next(res),
      err => console.log(err)
    );
  }

  getContributed(UserId: number) {
    return this._http.get(`/Project/GetContributed/${UserId}`).subscribe(
      (res: Project[]) => this.projectsSub.next(res),
      err => console.log(err)
    );
  }

  getOne(ProjectId: number) {
    return this._http.get(`/Project/GetOne/${ProjectId}`).subscribe(
      (res: Project) => this.projectSub.next(res),
      err => console.log(err)
    );
  }

  addProject(newProject: Project) {
    return this._http.post('/Project/Add', newProject).subscribe(
      (res: Project) => {
        this._router.navigate(['/project', res.ProjectId]);
      },
      err => this.parseErrors(err)
    );
  }

  editProject(editProject: Project) {
    return this._http.put('/Project/Edit', editProject).subscribe(
      (res: Project) => {
        this.getOne(res.ProjectId);
        this._router.navigate(['/project', res.ProjectId]);
      },
      err => this.parseErrors(err)
    );
  }

  deleteProject(ProjectId: number) {
    return this._http.delete(`/Project/Delete/${ProjectId}`).subscribe(
      res => this._router.navigate(['/']),
      err => console.log(err)
    );
  }

}
