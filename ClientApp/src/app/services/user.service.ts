import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private errorSub = new BehaviorSubject<object>(null);
  private userSub = new BehaviorSubject<User>(null);
  private profileSub = new BehaviorSubject<User>(null);
  public userErrors = this.errorSub.asObservable();
  public userLog = this.userSub.asObservable();
  public userProfile = this.profileSub.asObservable();

  constructor(
    private _http: HttpClient,
    private _router: Router
    ) { }

  private parseErrors(err: object) {
    const errors = {};
    for (const key in err['error']) {
      if (err['error'].hasOwnProperty(key)) {
        errors[key] = err['error'][key].Errors[0].ErrorMessage;
      }
    }
    this.errorSub.next(errors);
  }

  clearErrors() {
    this.errorSub.next(null);
  }

  clearLog() {
    this.userSub.next(null);
  }

  clearProfile() {
    this.profileSub.next(null);
  }

  setUser(res: User) {
    this.clearErrors();
    this.userSub.next(res);
    localStorage.setItem('user', JSON.stringify(res));
  }

  logout() {
    localStorage.removeItem('user');
    this.clearLog();
    this.clearProfile();
  }

  checkLog(shouldRedirect: boolean) {
    if (localStorage.getItem('user') != null) {
      this.userSub.next(JSON.parse(localStorage.getItem('user')));
      if (shouldRedirect) {
        this._router.navigate(['/']);
      }
    }
  }

  register(newUser: User) {
    return this._http.post('/User/Register', newUser).subscribe(
      (res: User) => {
        this.setUser(res);
        this._router.navigate(['/']);
      },
      err => this.parseErrors(err)
    );
  }

  login(tryUser: User) {
    return this._http.post('/User/Login', tryUser).subscribe(
      (res: User) => {
        this.setUser(res);
        this._router.navigate(['/']);
      },
      err => this.parseErrors(err)
    );
  }

  getProfile(UserId: number) {
    return this._http.get(`/User/Profile/${UserId}`).subscribe(
      (res: User) => {
        this.profileSub.next(res);
      },
      err => console.log(err)
    );
  }

  editUser(editUser: User) {
    return this._http.put('/User/Edit/', editUser).subscribe(
      (res: User) => {
        this.setUser(res);
        this.getProfile(res.UserId);
        this._router.navigate(['/user', res.UserId]);
      },
      err => this.parseErrors(err)
    );
  }

  deleteUser(UserId: number) {
    return this._http.delete(`/User/Delete/${UserId}`).subscribe(
      res => {
        this.logout();
        this._router.navigate(['/']);
      },
      err => console.log(err)
    );
  }

}
