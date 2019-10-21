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
  public bugList = this.bugSub.asObservable();
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

    getBugs() {
      return this._http.get('/Bug/GetBugs/').subscribe(
        (res: Bug[]) => {
          this.bugsSub.next(res);
        },
        err => {
          console.log(err);
        }
      );
    }

}
