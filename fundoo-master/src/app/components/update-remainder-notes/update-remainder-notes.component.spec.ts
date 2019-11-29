import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRemainderNotesComponent } from './update-remainder-notes.component';

describe('UpdateRemainderNotesComponent', () => {
  let component: UpdateRemainderNotesComponent;
  let fixture: ComponentFixture<UpdateRemainderNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRemainderNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRemainderNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
