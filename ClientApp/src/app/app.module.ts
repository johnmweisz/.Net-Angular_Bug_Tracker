import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BugHomeComponent } from './bug-home/bug-home.component';
import { BugsHomeComponent } from './bugs-home/bugs-home.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { BugsListComponent } from './bugs-list/bugs-list.component';
import { BugsAddedComponent } from './bugs-added/bugs-added.component';
import { BugsAssignedComponent } from './bugs-assigned/bugs-assigned.component';
import { BugsAddComponent } from './bugs-add/bugs-add.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    RegisterComponent,
    BugHomeComponent,
    BugsHomeComponent,
    UserHomeComponent,
    BugsListComponent,
    BugsAddedComponent,
    BugsAssignedComponent,
    BugsAddComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'bugs', pathMatch: 'full' },
      { path: 'user', component: UserHomeComponent },
      { path: 'bugs', component: BugsHomeComponent,
        children: [
          { path: 'list', component: BugsListComponent },
          { path: 'added', component: BugsAddedComponent },
          { path: 'assigned', component: BugsAssignedComponent },
          { path: 'add', component: BugsAddComponent }
        ]
      },
      { path: 'bug', component: BugHomeComponent },
      { path: 'register', component: RegisterComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
