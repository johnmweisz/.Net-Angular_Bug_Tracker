import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private routes: string[] =  [];
  private current: string;

  constructor(
    private _router: Router
    ) { }

  setRoute(route: string) {
    if (this.current) {
      this.routes.push(this.current);
    }
    this.current = route;
  }

  goBack() {
    if (this.routes.length > 1) {
      this.current = null;
      this._router.navigate([`${this.routes.pop()}`]);
    } else {
      this._router.navigate([`/`]);
    }
  }

}
