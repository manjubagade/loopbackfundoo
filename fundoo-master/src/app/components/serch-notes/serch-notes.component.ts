import { Component, OnInit,Input } from '@angular/core';
import { DataServiceService } from '../../service/DataService/data-service.service';
import { NoteService } from '../../service/NoteService/note.service';

@Component({
  selector: 'app-serch-notes',
  templateUrl: './serch-notes.component.html',
  styleUrls: ['./serch-notes.component.scss']
})
export class SerchNotesComponent implements OnInit {
  @Input() pinnedNotes;
  @Input() unpinnedNotes;
  constructor(private dataService:DataServiceService,private noteService:NoteService) { }
  all_notes=[];
  card=[];
  value;
  resultcard;
  pinedNotes=[]
  unPinnedNotes=[]
  search_card=[]
  ngOnInit() {
    this.getNotes();

    this.dataService.currentMessage.subscribe(data=>{
      if(data.type == 'search'){
          //console.log('searching data from dataService..',data)
          this.value = data.data; // sended data are like json format...
          //console.log("all_notes",this.all_notes)
          this.card = this.findCard(this.all_notes,this.value)
          //console.log("searching card...",this.card)
       }
     })

  }

  getNotes(){
    
  
    this.noteService.getNote().subscribe(data=>{
      //console.log("find data...",data)
      this.all_notes = data['data']['data']
      //console.log('getting all_notes...',this.all_notes)
      //console.log("all the best...",this.card)
    },
    err => {
      console.log(err);

    });
  }

  findCard = function(notes,searchnotes){
     this.resultcard = notes.filter(data=>{
     console.log('search data',data.title, ' search notes ',searchnotes,'search Label',data.label);
       
      return data.title.toLowerCase().startsWith(searchnotes.toLowerCase()) || data.description.toLowerCase().startsWith(searchnotes.toLowerCase());
    })
    //console.log("search notes..",this.resultcard)
    return this.resultcard
  }

}
