import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private routes: string[] =  [];

  constructor(
    private _router: Router
    ) { }

    setRoute(route: string) {
      if (this.routes[this.routes.length - 1] !== route) {
        this.routes.push(route);
      }
    }

    goBack() {
      if (this.routes.length > 1) {
        this.routes.pop();
        this._router.navigate([`${this.routes.pop()}`]);
      } else {
        this._router.navigate([`/`]);
      }
    }

}
