import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAddedComponent } from './projects-added.component';

describe('ProjectsAddedComponent', () => {
  let component: ProjectsAddedComponent;
  let fixture: ComponentFixture<ProjectsAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
