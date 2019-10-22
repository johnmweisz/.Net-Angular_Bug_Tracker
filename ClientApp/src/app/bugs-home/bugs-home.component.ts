import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bugs-home',
  templateUrl: './bugs-home.component.html',
  styleUrls: ['./bugs-home.component.css']
})
export class BugsHomeComponent implements OnInit {
  public canView = false;

  constructor(  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      this.canView = true;
    }
  }

}
