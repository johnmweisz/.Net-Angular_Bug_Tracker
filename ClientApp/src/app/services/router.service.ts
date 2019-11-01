import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  public currentRoute: string;
  public previousRoute: string;

  constructor(
    private _router: Router
    ) { }

    setRoute(route: string) {
      if (!this.currentRoute) {
        this.previousRoute = route;
      } else {
        this.previousRoute = this.currentRoute;
      }
      this.currentRoute = route;
    }

    goBack() {
      if (this.previousRoute === this.currentRoute) {
        this._router.navigate([`/projects`]);
      } else {
        this._router.navigate([`${this.previousRoute}`]);
      }
    }

}
