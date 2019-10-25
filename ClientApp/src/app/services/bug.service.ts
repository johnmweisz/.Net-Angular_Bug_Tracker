import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Bug } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BugService {
  private errorSub = new BehaviorSubject<object>(null);
  private bugsSub = new BehaviorSubject<Bug[]>(null);
  private bugSub = new BehaviorSubject<Bug>(null);
  public bugErrors = this.errorSub.asObservable();
  public bugList = this.bugsSub.asObservable();
  public aBug = this.bugSub.asObservable();

  constructor(
    private _http: HttpClient,
    private _router: Router
    ) { }

    parseErrors(err: object) {
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

    clearBugs() {
      this.bugsSub.next(null);
    }

    clearBug() {
      this.bugSub.next(null);
    }

    getAll(ProjectId?: number) {
      if (ProjectId == null) {
        return this._http.get('/Bug/GetAll').subscribe(
          (res: Bug[]) => this.bugsSub.next(res),
          err => console.log(err)
        );
      } else {
        return this._http.get(`/Bug/GetAll/${ProjectId}`).subscribe(
          (res: Bug[]) => this.bugsSub.next(res),
          err => console.log(err)
        );
      }
    }

    getAdded(UserId: number, ProjectId?: number) {
      if (ProjectId == null) {
        return this._http.get(`/Bug/GetAdded/${UserId}`).subscribe(
          (res: Bug[]) => this.bugsSub.next(res),
          err => console.log(err));
      } else {
        return this._http.get(`/Bug/GetAdded/${UserId}/${ProjectId}`).subscribe(
          (res: Bug[]) => this.bugsSub.next(res),
          err => console.log(err));
      }
    }

    getAssigned(UserId: number, ProjectId?: number) {
      if (ProjectId == null) {
        return this._http.get(`/Bug/GetAssigned/${UserId}`).subscribe(
          (res: Bug[]) => this.bugsSub.next(res),
          err => console.log(err));
      } else {
        return this._http.get(`/Bug/GetAssigned/${UserId}/${ProjectId}`).subscribe(
          (res: Bug[]) => this.bugsSub.next(res),
          err => console.log(err));
      }

    }

    getOne(BugId: number) {
      return this._http.get(`/Bug/GetOne/${BugId}`).subscribe(
        (res: Bug) => this.bugSub.next(res),
        err => console.log(err)
      );
    }

    addBug(newBug: Bug) {
      return this._http.post('/Bug/Add', newBug).subscribe(
        (res: Bug) => {
          this.getOne(res.BugId);
          this._router.navigate(['/bug', res.BugId]);
        },
        err => this.parseErrors(err)
      );
    }

    editBug(editBug: Bug) {
      return this._http.put('/Bug/Edit', editBug).subscribe(
        (res: Bug) => {
          this.getOne(res.BugId);
          this._router.navigate(['/bug', res.BugId]);
        },
        err => this.parseErrors(err)
      );
    }

    deleteBug(BugId: number) {
      return this._http.delete(`/User/Delete/${BugId}`).subscribe(
        res => this._router.navigate(['/']),
        err => console.log(err)
      );
    }

}
