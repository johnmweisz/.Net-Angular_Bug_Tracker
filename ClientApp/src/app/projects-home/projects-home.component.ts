import { RouterService } from './../services/router.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-home',
  templateUrl: './projects-home.component.html',
  styleUrls: ['./projects-home.component.css']
})
export class ProjectsHomeComponent implements OnInit {
  public canView = false;

  constructor(
    private _router: RouterService
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.canView = true;
    }
    this._router.setRoute(`/projects`);
  }

}
