import { Component, OnInit, ViewChild } from '@angular/core';
import { NoteService } from '../../service/NoteService/note.service';

@Component({
  selector: 'app-archive-note',
  templateUrl: './archive-note.component.html',
  styleUrls: ['./archive-note.component.scss']
})
export class ArchiveNoteComponent implements OnInit {
  notes=[]
  get_notes=[]
  archiveNotes=[]
  pinnedNotes=[]
  unPinnedNotes=[]
  constructor(private noteService:NoteService) { }
  ngOnInit() {
    this.getAllCard()
  }
  

  getAllCard() {
    //console.log("checking viewchild",this.childcomponent.removable)

    this.noteService.getNote().subscribe(data => {
      this.notes = data['data']['data'];
      this.get_notes = this.notes.reverse();
      //console.log("archive data...!",data)
      for (let i = 0; i < this.notes.length; i++) {
        if ((this.get_notes[i]['isArchived'] == true)) {
          this.archiveNotes.push(this.notes[i]);

        }
        
      }
     

      
    }, err => {
      console.log(err);

    });
  }
  
}
