import { Component, OnInit,Input } from '@angular/core';
import { NoteService } from '../../service/NoteService/note.service';

@Component({
  selector: 'app-reminder-notes',
  templateUrl: './reminder-notes.component.html',
  styleUrls: ['./reminder-notes.component.scss']
})
export class ReminderNotesComponent implements OnInit {

  @Input() pinnedNotes;
  @Input() unpinnedNotes;
  notes = []
  get_notes = []
  remainderNotes=[]
  pinedNotes=[]
  unPinnedNotes=[]
  constructor(private noteService:NoteService) { }
  
  
  ngOnInit() {
    
    this.getRemainderNotes()
  }
  
  getRemainderNotes(){
    this.noteService.getRemainderNotes().subscribe(data=>{
      //console.log("reaminder notes..!",data)
      this.notes = data['data']['data']
      this.get_notes = this.notes.reverse()
     
      for(let i=0;i<this.get_notes.length;i++){
        this.remainderNotes.push(this.get_notes[i])
      }
      //console.log('remainder notes..!',this.get_notes)
      //console.log('Testing remainder notes..!',this.remainderNotes)
    })

  }
}
