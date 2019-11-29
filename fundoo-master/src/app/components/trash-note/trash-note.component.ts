import { Component, OnInit,Input } from '@angular/core';
import { NoteService } from '../../service/NoteService/note.service';

@Component({
  selector: 'app-trash-note',
  templateUrl: './trash-note.component.html',
  styleUrls: ['./trash-note.component.scss']
})
export class TrashNoteComponent implements OnInit {
  
  @Input() pinnedNotes;
  @Input() unpinnedNotes;
  notes=[]
  get_notes=[]
  trashNotes=[]
  pinedNotes=[]
  unPinnedNotes=[]
  constructor(private noteService:NoteService) { }

  ngOnInit() {
    this.getAllCard()
  }
  getAllCard() {
    this.noteService.getNote().subscribe(data => {
      this.notes = data['data']['data'];
      this.get_notes = this.notes.reverse();
      //console.log("trash notes..!",data);
      for (let i = 0; i < this.notes.length; i++) {
        if (this.get_notes[i]['isDeleted'] == true) {
          this.trashNotes.push(this.notes[i]);

        }
        // if(this.get_notes[i]['isDeleted']==false || this.get_notes[i]['isArchive']==false){
        //   if (this.get_notes[i]['isPined'] == true) {
        //     this.pinedNotes.push(this.get_notes[i]);
        //     console.log("pinned notes are...!",this.pinedNotes)
        //   }
        //   else{
        //     this.unPinnedNotes.push(this.get_notes[i])
        //     console.log("unpinned notes are...!",this.unPinnedNotes)
        //   }
        // }
      }
     

      console.log("isdeleted notes",this.trashNotes)
      //console.log("Length of deleted notes",this.trashNotes.length)

      //console.log("reverse order", this.get_notes)
    }, err => {
      console.log(err);

    });
  }

}
