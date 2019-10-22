import { Component, OnInit, OnDestroy } from '@angular/core';
import { BugService } from '../services/bug.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bugs-add',
  templateUrl: './bugs-add.component.html',
  styleUrls: ['./bugs-add.component.css']
})
export class BugsAddComponent implements OnInit, OnDestroy {
  private errorSub: Subscription;
  public errors: object;
  public BugId: number;
  public Subject: string;
  public Description: string;
  public Priority: string;
  public Status: string;
  public DueDate: string;
  public UserId: number;
  public ProjectId: number;

  constructor(
    private _bugs: BugService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user')) === null) {
      this._router.navigate(['/']);
    }
    this._bugs.clearErrors();
    this.errorSub = this._bugs.bugErrors.subscribe(e => this.errors = e);
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }


}
