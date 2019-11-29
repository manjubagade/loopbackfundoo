import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DataServiceService} from '../../service/DataService/data-service.service';
import {NoteService} from '../../service/NoteService/note.service';
import { MatSnackBar } from '@angular/material';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-update-remainder-notes',
  templateUrl: './update-remainder-notes.component.html',
  styleUrls: ['./update-remainder-notes.component.scss']
})
export class UpdateRemainderNotesComponent implements OnInit {
  schedule=['Daily','Weekly','Monthly','Yearly']
  constructor(public dataService: DataServiceService, public dialogRef: MatDialogRef<UpdateRemainderNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object,public noteService:NoteService,private snackBar:MatSnackBar) { }
  datetimepick:[];
  userid;
  noteid;
  ngOnInit() {
  //  console.log('reaminder Notes..!',this.data['id'])
  //  console.log('remainder Update..!',this.data['reminder'])
    this.datetimepick = this.data['reminder']
    this.noteid = this.data['id']
    this.userid = localStorage.getItem('userId')
  }


  setRemainder(datetimepick){
    console.log("datepick property..!",datetimepick)
    var contents={
      reminder:[datetimepick],
      noteIdList:[this.noteid],
      userId:this.userid
    }
    console.log("icon date and time values...!",datetimepick)
    this.noteService.addRemainder('notes/addUpdateReminderNotes',contents).subscribe(data=>{
      //console.log("remainder date and time...!",data)
      this.dataService.changeMessage({
        data:{},
        type:'setRemainder'
      })
      this.snackBar.open("remainder added to Note successfully...","close",{duration:3000,});

    },
    err =>{
      console.log(err)
    })
    this.dialogRef.close();

  }
}
