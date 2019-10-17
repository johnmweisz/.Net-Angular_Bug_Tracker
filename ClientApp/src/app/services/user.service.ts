import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private errorSub = new BehaviorSubject<object>(null);
  private userSub = new BehaviorSubject<object>(null);
  private profileSub = new BehaviorSubject<object>(null);
  userErrors = this.errorSub.asObservable();
  userLog = this.userSub.asObservable();
  userProfile = this.userSub.asObservable();

  constructor(
    private _http: HttpClient,
    private _router: Router
    ) { }

  register(newUser: object) {
    return this._http.post('/User/Register', newUser).subscribe(
      res => {
        this.errorSub.next(null);
        this.userSub.next(res);
        localStorage.setItem('user', JSON.stringify(res));
        this._router.navigate(['/']);
      },
      err => {
        const errors = {};
        for (const key in err.error) {
          if (err.error.hasOwnProperty(key)) {
            errors[key] = err.error[key].Errors[0].ErrorMessage;
          }
        }
        this.errorSub.next(errors);
      }
    );
  }

  login(tryUser: object) {
    return this._http.post('/User/Login', tryUser).subscribe(
      res => {
        this.errorSub.next(null);
        this.userSub.next(res);
        localStorage.setItem('user', JSON.stringify(res));
        this._router.navigate(['/']);
      },
      err => {
        const errors = {};
        for (const key in err.error) {
          if (err.error.hasOwnProperty(key)) {
            errors[key] = err.error[key].Errors[0].ErrorMessage;
          }
        }
        this.errorSub.next(errors);
      }
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSub.next(null);
  }

  checkLog(shouldRedirect) {
    if (localStorage.getItem('user') != null) {
      this.userSub.next(JSON.parse(localStorage.getItem('user')));
      if (shouldRedirect) {
        this._router.navigate(['/']);
      }
    }
  }

  clearErrors() {
    this.errorSub.next(null);
  }

  getProfile(UserId: number) {
    return this._http.get(`/User/Profile/${UserId}`).subscribe(
      res => {
        this.profileSub.next(res);
      },
      err => {
        console.log(err);
      }
    );
  }

}
