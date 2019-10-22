import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsContributedComponent } from './projects-contributed.component';

describe('ProjectsContributedComponent', () => {
  let component: ProjectsContributedComponent;
  let fixture: ComponentFixture<ProjectsContributedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsContributedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsContributedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
