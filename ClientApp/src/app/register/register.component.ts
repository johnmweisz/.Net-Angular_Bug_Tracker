import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public FirstName: string;
  public LastName: string;
  public Email: string;
  public Password: string;
  public Confirm: string;
  public errors: object[] = [];

  constructor(
    private _http: HttpClient,
    private _router: Router
    ) {}

  ngOnInit() {
  }

  register() {
    const newUser = {
      FirstName: this.FirstName,
      LastName: this.LastName,
      Email: this.Email,
      Password: this.Password,
      Confirm: this.Confirm
    };
    return this._http.post('/User/Register', newUser).subscribe(
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
