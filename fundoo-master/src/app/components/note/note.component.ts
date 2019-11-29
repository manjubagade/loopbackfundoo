import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../service/NoteService/note.service';
import { DataServiceService } from '../../service/DataService/data-service.service'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  constructor(private noteService: NoteService, private dataService: DataServiceService) { }
  notes = [];
  get_notes = [];
  displayNote = [];
  refresh:any;
  pinedNotes=[]
  unpinnedNotes=[]
  remainderNotes=[]
  ngOnInit() {
    this.getAllCard();
    this.dataService.currentMessage.subscribe(data => {
      console.log('data service run');
      
      if (data.type == 'update' || data.type == 'archive' || data.type=='trash' || data.type == 'pin' || 
      data.type =='unpin' || data.type == 'restore' || data.type == 'deleteNote' ) {
        this.getAllCard();
      }
     
      else if(data.type=='setRemainder' || data.type == 'setRemainderToday' || data.type == 'setRemainderTommorow' 
              || data.type == 'setRemainderNextWeek' || data.type == 'removeRemainder'  ){
        this.getAllCard();
      }
      else if(data.type=='addCollaborator' || data.type == 'deleteCollaborator'  ){
        this.getAllCard();
      }
 
      
    },
    
    )
  }
  update(event){
    console.log("event emitter printed...")
    this.getAllCard();
  }
  reloadevent(event){
    console.log("checking Label add/delete event....!")
    this.getAllCard();
  }


  getAllCard() {
    this.noteService.getNote().subscribe(data => {
      this.notes = data['data']['data'];
      this.get_notes = this.notes.reverse();
      // Note:=> "please initialize array every time otherwise array will over-written so reinitialize the array as shown below:"
      this.displayNote=[]; this.pinedNotes=[];this.unpinnedNotes=[] 
      //console.log('get_Notes..',this.get_notes)
     
      for (let i = 0; i < this.notes.length; i++) {
        
        if ((this.get_notes[i]['isDeleted'] == false) && (this.get_notes[i]['isArchived'] == false)) {
            this.displayNote.push(this.get_notes[i]);
        }

        if ((this.get_notes[i]['isDeleted']==false) && (this.get_notes[i]['isArchived']==false)){
          if (this.get_notes[i]['isPined'] == true) {
            this.pinedNotes.push(this.get_notes[i]);
            //console.log("pinned notes are...! ", this.pinedNotes)
          }
          else{
            this.unpinnedNotes.push(this.get_notes[i]) 
            //console.log("unpinned notes are...!",this.unpinnedNotes)
          }
        }

      }
      //console.log("needed informations...!",this.displayNote)
      

      //console.log("isdeleted notes",this.displayNote)
      //console.log("is notes",this.displayNote)

      //console.log("reverse order", this.get_notes)
    }, err => {
      console.log(err);

    });
  }


}
