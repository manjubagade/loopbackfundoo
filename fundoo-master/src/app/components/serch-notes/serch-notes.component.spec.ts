import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerchNotesComponent } from './serch-notes.component';

describe('SerchNotesComponent', () => {
  let component: SerchNotesComponent;
  let fixture: ComponentFixture<SerchNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerchNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerchNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
