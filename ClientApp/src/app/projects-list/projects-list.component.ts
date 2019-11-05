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
  public limit = 5;
  public ascending = true;
  public paginationList = [];
  public search: string;

  constructor(
    private _projects: ProjectService
  ) { }

  pagination(projectCount: number) {
    let index = 1;
    for (let i = 0; i < projectCount; i += this.limit) {
      this.paginationList.push(
        {
          index:  index,
          start: i
        }
      );
      index++;
    }
  }

  ngOnInit() {
    this._projects.getAll(this.start, this.limit, this.ascending);
    this.projectListSub = this._projects.projectList.subscribe(p => {
      this.projects = p;
    });
    this.paginationCountSub = this._projects.paginationCount.subscribe(c => {
      this.paginationList = [];
      this.pagination(c);
    });
  }

  ngOnDestroy() {
    this.projectListSub.unsubscribe();
    this.paginationCountSub.unsubscribe();
  }

  getList(start: number = 0) {
    this.start = start;
    this._projects.getAll(start, this.limit, this.ascending, this.search);
  }

  toggleAscending() {
    this.ascending = !this.ascending;
    this.getList();
  }

}
