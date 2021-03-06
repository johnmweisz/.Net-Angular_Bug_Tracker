import { BugService } from './bug.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Update } from '../models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private errorSub = new BehaviorSubject<object>(null);
  private updatesSub = new BehaviorSubject<Update[]>(null);
  private updateSub = new BehaviorSubject<Update>(null);
  public updateErrors = this.errorSub.asObservable();
  public updateList = this.updatesSub.asObservable();
  public aUpdate = this.updateSub.asObservable();

  constructor(
    private _http: HttpClient,
    private _bugs: BugService,
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

    clearUpdates() {
      this.updatesSub.next(null);
    }

    clearUpdate() {
      this.updateSub.next(null);
    }

    getAllBug(BugId: number) {
      return this._http.get(`/Update/AllBug`, {params: { BugId: `${BugId}` }}).subscribe(
        (res: Update[]) => this.updatesSub.next(res),
        err => console.log(err)
      );
    }

    getAllUser(UserId: number) {
      return this._http.get(`/Update/AllUser`, {params: { UserId: `${UserId}` }}).subscribe(
        (res: Update[]) => this.updatesSub.next(res),
        err => console.log(err)
      );
    }

    getOne(UpdateId: number) {
      return this._http.get(`/Update/One`, {params: { UpdateId: `${UpdateId}` }}).subscribe(
        (res: Update) => this.updateSub.next(res),
        err => console.log(err)
      );
    }

    add(newUpdate: Update) {
      return this._http.post(`/Update/Add`, newUpdate).subscribe(
        (res: Update) => this._bugs.getOne(res.BugId),
        err => this.parseErrors(err)
      );
    }

    delete(UpdateId: number) {
      return this._http.delete(`/Update/Delete`, {params: { UpdateId: `${UpdateId}` }}).subscribe(
        (res: Update) => this._bugs.getOne(res.BugId),
        err => console.log(err)
      );
    }

}
