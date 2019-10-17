import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsAssignedComponent } from './bugs-assigned.component';

describe('BugsAssignedComponent', () => {
  let component: BugsAssignedComponent;
  let fixture: ComponentFixture<BugsAssignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugsAssignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugsAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
