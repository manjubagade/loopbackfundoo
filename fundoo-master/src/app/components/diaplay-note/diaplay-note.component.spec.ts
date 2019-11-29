import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaplayNoteComponent } from './diaplay-note.component';

describe('DiaplayNoteComponent', () => {
  let component: DiaplayNoteComponent;
  let fixture: ComponentFixture<DiaplayNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaplayNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaplayNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
