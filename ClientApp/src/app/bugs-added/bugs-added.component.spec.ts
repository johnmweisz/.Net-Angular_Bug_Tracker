import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsAddedComponent } from './bugs-added.component';

describe('BugsAddedComponent', () => {
  let component: BugsAddedComponent;
  let fixture: ComponentFixture<BugsAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugsAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugsAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
