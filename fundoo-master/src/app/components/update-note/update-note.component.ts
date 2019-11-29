import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataServiceService } from '../../service/DataService/data-service.service'
import { NoteService } from '../../service/NoteService/note.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  constructor(public dataService: DataServiceService, public dialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object,public noteService:NoteService,private snackBar:MatSnackBar) { }
  
  title: string;
  description:string;
  card:any;
  ngOnInit() {
    console.log('data ', this.data);
    
      this.title=this.data['title'];
      this.description=this.data['description'];
      this.card=this.data['id'];
    
      this.dataService.currentMessage.subscribe(message => {console.log('data in update',message)})

  }

  close(): void {
    var contents={
      "title":this.title,
      "description":this.description,
      "noteId":this.card
    }
    this.noteService.updateNote('notes/updateNotes',contents).subscribe(data=>{
      //console.log(data);
      this.dataService.changeMessage({
        data:{},
        type:'update'
      })
      this.snackBar.open("Note Updated Successfully..","close", {
        duration: 3000,
      });
    },
    err =>{
      console.log(err)
    })
    this.dialogRef.close();
  }
  // newMessage() {
    
  //   this.dataService.changeMessage({})
  // }
  

}
