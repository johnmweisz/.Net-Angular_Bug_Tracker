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
import { BugTrackComponent } from './bug-track/bug-track.component';
import { BugEditComponent } from './bug-edit/bug-edit.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ProjectsHomeComponent } from './projects-home/projects-home.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsContributedComponent } from './projects-contributed/projects-contributed.component';
import { ProjectsAddedComponent } from './projects-added/projects-added.component';
import { ProjectsAddComponent } from './projects-add/projects-add.component';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectContributorsComponent } from './project-contributors/project-contributors.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

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
    BugsAddComponent,
    BugTrackComponent,
    BugEditComponent,
    UserProfileComponent,
    UserEditComponent,
    ProjectsHomeComponent,
    ProjectsListComponent,
    ProjectsContributedComponent,
    ProjectsAddedComponent,
    ProjectsAddComponent,
    ProjectHomeComponent,
    ProjectEditComponent,
    ProjectContributorsComponent,
    ProjectDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
      { path: 'user/:UserId', component: UserHomeComponent,
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          { path: 'profile', component: UserProfileComponent },
          { path: 'edit', component: UserEditComponent }
        ]
      },
      { path: 'projects', component: ProjectsHomeComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: ProjectsListComponent },
          { path: 'added', component: ProjectsAddedComponent },
          { path: 'contributed', component: ProjectsContributedComponent },
          { path: 'add', component: ProjectsAddComponent }
        ]
      },
      { path: 'project/:ProjectId', component: ProjectHomeComponent,
        children: [
          { path: '', redirectTo: 'detail', pathMatch: 'full' },
          { path: 'detail', component: ProjectDetailComponent },
          { path: 'contributors', component: ProjectContributorsComponent },
          { path: 'edit', component: ProjectEditComponent }
        ]
      },
      { path: 'bugs/:ProjectId', component: BugsHomeComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: BugsListComponent },
          { path: 'added', component: BugsAddedComponent },
          { path: 'assigned', component: BugsAssignedComponent },
          { path: 'add', component: BugsAddComponent }
        ]
      },
      { path: 'bug/:BugId', component: BugHomeComponent,
        children: [
          { path: '', redirectTo: 'track', pathMatch: 'full' },
          { path: 'track', component: BugTrackComponent },
          { path: 'edit', component: BugEditComponent }
        ]
      },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: 'projects/list' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
