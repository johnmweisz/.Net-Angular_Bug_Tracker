import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-home',
  templateUrl: './projects-home.component.html',
  styleUrls: ['./projects-home.component.css']
})
export class ProjectsHomeComponent implements OnInit {
  public canView = false;

  constructor() { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      this.canView = true;
    }
  }

}
