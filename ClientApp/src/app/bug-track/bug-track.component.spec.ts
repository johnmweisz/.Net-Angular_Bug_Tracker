import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugTrackComponent } from './bug-track.component';

describe('BugTrackComponent', () => {
  let component: BugTrackComponent;
  let fixture: ComponentFixture<BugTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
