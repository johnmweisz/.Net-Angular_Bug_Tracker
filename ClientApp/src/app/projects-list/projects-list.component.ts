import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../models';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  private projectListSub: Subscription;
  private paginationCountSub: Subscription;
  public projects: Project[];
  public start = 0;
  public limit = 20;
  public createdat = 'null';
  public contributors = 'null';
  public bugs = 'null';
  public name = 'null';
  public paginationList = [];
  public search: string;

  constructor(
    private _projects: ProjectService
  ) { }

  pagination(projectCount: number) {
    this.paginationList = [];
    for (let i = 0; i < projectCount; i += this.limit) {
      this.paginationList.push(i);
    }
  }

  ngOnInit() {
    this._projects.getAll(this.start, this.limit, this.createdat, this.contributors, this.bugs, this.name);
    this.projectListSub = this._projects.projectList.subscribe(p => this.projects = p);
    this.paginationCountSub = this._projects.paginationCount.subscribe(c => this.pagination(c));
  }

  ngOnDestroy() {
    this.projectListSub.unsubscribe();
    this.paginationCountSub.unsubscribe();
  }

  getList(start: number = 0) {
    this.start = start;
    this._projects.getAll(start, this.limit, this.createdat, this.contributors, this.bugs, this.name, this.search);
  }

  toggleCreatedAt() {
    const sortQuery = this.createdat;
    this.resetSort();
    if (sortQuery === 'asc') {
      this.createdat = 'desc';
    } else {
      this.createdat = 'asc';
    }
    this.getList();
  }

  toggleContributors() {
    const sortQuery = this.contributors;
    this.resetSort();
    if (sortQuery === 'asc') {
      this.contributors = 'desc';
    } else {
      this.contributors = 'asc';
    }
    this.getList();
  }

  toggleBugs() {
    const sortQuery = this.bugs;
    this.resetSort();
    if (sortQuery === 'asc') {
      this.bugs = 'desc';
    } else {
      this.bugs = 'asc';
    }
    this.getList();
  }

  toggleName() {
    const sortQuery = this.name;
    this.resetSort();
    if (sortQuery === 'asc') {
      this.name = 'desc';
    } else {
      this.name = 'asc';
    }
    this.getList();
  }

  resetSort() {
    this.createdat = 'null';
    this.contributors = 'null';
    this.bugs = 'null';
    this.name = 'null';
  }

}
