import { Component, OnInit, Input,Inject, Output,EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { NoteService } from '../../service/NoteService/note.service';
import {DataServiceService} from '../../service/DataService/data-service.service'
import { MatSnackBar } from '@angular/material';
import { LabelService } from '../../service/LabelService/label.service';
import {UpdateRemainderNotesComponent} from '../../components/update-remainder-notes/update-remainder-notes.component'
@Component({
  selector: 'app-diaplay-note',
  templateUrl: './diaplay-note.component.html',
  styleUrls: ['./diaplay-note.component.scss']
})
export class DiaplayNoteComponent implements OnInit {
  @Input() allCards;
  @Input() pinnedNotes;
  @Input() unpinnedNotes;
  @Output() addlabelEvent = new EventEmitter<any>();
  @Output() deletelabelEvent = new EventEmitter<any>();
  @Output() unarchiveEvent = new EventEmitter<any>();

  value="row"; // here iam changed to default value value=row to display gridview defaultly
  
  title:string
  description:string
  card:any
  allLabels=[]
  getLabels=[]
  public removable = true;
  notes=[]
  
  userid = localStorage.getItem('userId');
 
 
  constructor(public dialog: MatDialog,public noteService:NoteService,private dataService: DataServiceService,
    public snackBar:MatSnackBar,private labelService:LabelService ) { }

ngOnInit() {
  this.getNoteLabels()
  this.dataService.currentMessage.subscribe(data=>{
    if(data.type=='grid-list'){
     console.log("grid_list value..!",data)
      if(data.data){
        console.log('data is false');
        
        this.value='column'
      }
      else{
        this.value='row'
      }
    }
  })
}
reloadAction(event){
  console.log("reloadEvent emitter..");
  this.getNoteLabels();
  this.addlabelEvent.emit();
  this.unarchiveEvent.emit();
}
modifyNote(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '50%',
      data: note
    });
  
}
modifyRemainder(note):void{
  const dialogRef = this.dialog.open(UpdateRemainderNotesComponent,{
    width: '30%',
    data: note
  })
}
public get_notes=[]
displayNote=[]
pinedNotes=[]
isPined(note)
{
        var contents={
          noteIdList : [note['id']],
          isPined:true
      }
      
      this.noteService.ispined('notes/pinUnpinNotes',contents).subscribe(data=>{
        //console.log('pinned notes....',data)
        
        console.log("pinned notes..",this.pinedNotes)
        this.dataService.changeMessage({
          data:{},
          type:'pin'
        })
        //debugger
        this.snackBar.open("Note Pinned  Successfully..", "close", {
          duration: 3000,
        });
      },
      err => {
        console.log(err)
      })
}
isUnPined(note)
{
        var contents={
          noteIdList : [note['id']],
          isPined:false
      }
      
      this.noteService.ispined('notes/pinUnpinNotes',contents).subscribe(data=>{
        //console.log('pinned notes....',data)
        
        console.log("pinned notes..",this.pinedNotes)
        this.dataService.changeMessage({
          data:{},
          type:'unpin'
        })

        this.snackBar.open("Note Updated Successfully..", "close", {
          duration: 3000,
        });
      },
      err => {
        console.log(err)
      })
}




  getNoteLabels(){
      this.labelService.getLabel().subscribe(data=>{
        //console.log("labels data...",data)
        this.allLabels = data['data']['details'];
        this.getLabels = this.allLabels.reverse();
        console.log("get labels..",this.getLabels)
        
      },
      err=>{
        console.log(err)
      });
    }
    deleteNoteLabel(noteid,labelsid){
      var contents={
        noteId:noteid,
        labelId:labelsid
      }
      this.noteService.deleteLabelNote('notes/'+contents.noteId+'/addLabelToNotes/'+contents.labelId+'/remove',contents).subscribe(data=>{
        //console.log('deleteLabelNote..!',data)
        this.deletelabelEvent.emit();
        this.snackBar.open("Label to Note deleted successfully...","close",{duration:3000,});

      },
      err=>{
        console.log(err)
      });
    }
    deleteRemainder(noteid,notereminder){
      var contents={
        reminder:[notereminder],
        noteIdList:[noteid],
        userId:this.userid
      }
      this.noteService.removeRemainder('notes/removeReminderNotes',contents).subscribe(data=>{
        //console.log('reamove remainder from note',data)
        this.dataService.changeMessage({
          data:{},
          type:'removeRemainder'
        })
        this.snackBar.open("Remainder removed from note..!","close",{duration:3000,});
      })
    }

   
}
