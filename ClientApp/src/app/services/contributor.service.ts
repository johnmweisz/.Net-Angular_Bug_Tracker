import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Contributor } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContributorService {
  private contributorsSub = new BehaviorSubject<Contributor[]>(null);
  private contributorSub = new BehaviorSubject<Contributor>(null);
  public contributors = this.contributorsSub.asObservable();
  public contributor = this.contributorSub.asObservable();

  constructor(
    private _http: HttpClient,
    private _router: Router
    ) { }

    getAll(ContributorId: number) {
      return this._http.get(`/Contributor/GetAll/${ContributorId}`).subscribe(
        (res: Contributor[]) => this.contributorsSub.next(res),
        err => console.log(err)
      );
    }

    add(newContributor: Contributor) {
      return this._http.post(`/Contributor/AddContributor`, newContributor).subscribe(
        (res: Contributor) => this.contributorSub.next(res),
        err => console.log(err)
      );
    }

    authorize(ContributorId: number) {
      return this._http.get(`/Contributor/AuthorizeContributor/${ContributorId}`).subscribe(
        (res: Contributor) => this.contributorSub.next(res),
        err => console.log(err)
      );
    }

    deauthorize(ContributorId: number) {
      return this._http.get(`/Contributor/DeauthorizeContributor/${ContributorId}`).subscribe(
        (res: Contributor) => this.contributorSub.next(res),
        err => console.log(err)
      );
    }

    authorizeAll(ProjectId: number) {
      return this._http.get(`/Contributor/AuthorizeAll/${ProjectId}`).subscribe(
        (res: Contributor[]) => this.contributorsSub.next(res),
        err => console.log(err)
      );
    }

    delete(ContributorId: number) {
      return this._http.get(`/Contributor/DeleteContibutor/${ContributorId}`).subscribe(
        (res: Contributor) => this.contributorSub.next(res),
        err => console.log(err)
      );
    }

}
