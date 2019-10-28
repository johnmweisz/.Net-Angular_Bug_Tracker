import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Project } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContributorService {
  private contributorsSub = new BehaviorSubject<Project[]>(null);
  private contributorSub = new BehaviorSubject<Project>(null);
  public contributors = this.contributorsSub.asObservable();
  public contributor = this.contributorSub.asObservable();

  constructor(
    private _http: HttpClient,
    private _router: Router
    ) { }

}
