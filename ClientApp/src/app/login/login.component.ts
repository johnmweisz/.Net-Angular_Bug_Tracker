import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Email: string;
  Password: string;
  errors: object[] = [];

  constructor(
    private _http: HttpClient,
    private _router: Router
    ) {}

  ngOnInit() {
  }

  login() {
    const tryUser = {
      Email: this.Email,
      Password: this.Password,
    };
    return this._http.post('/User/Login', tryUser).subscribe(
      res => {
        this.errors = [];
        localStorage.setItem('user', JSON.stringify(res));
        this._router.navigate(['/']);
      },
      err => {
        for (const key in err.error) {
          if (err.error.hasOwnProperty(key)) {
            this.errors[key] = err.error[key].Errors[0].ErrorMessage;
          }
        }
      }
    );
  }

}
