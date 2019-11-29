import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { NoteService } from 'src/app/service/NoteService/note.service';
import { FormControl, Validators, SelectControlValueAccessor } from '@angular/forms';
import { MatSnackBar } from '@angular/material';


import { Router } from '@angular/router';

@Component({
  selector: 'app-take-note',
  templateUrl: './take-note.component.html',
  styleUrls: ['./take-note.component.scss']
})
export class TakeNoteComponent implements OnInit {
  

  constructor(private noteService:NoteService, public router:Router,private snackBar:MatSnackBar) { }
title=new FormControl('',[Validators.required])
description=new FormControl('',[Validators.required])
setcolor;
  ngOnInit() {
  }
  @Output() refreshEvent = new EventEmitter<any>();

  setColor(event){
    this.setcolor = event
  }



  addNote(){
    var form_contents = {
      "title":this.title.value,
      "description":this.description.value
    }
    console.log(form_contents)
    if(this.title.value =='' || this.description.value == '' )
    {
      // this.snackBar.open("title and description is required...","close", {
        // duration: 3000,
      // });
    }
    else{
      this.noteService.addNote('notes/addNotes',form_contents).subscribe(data =>{
        //console.log(data,"note data")
        this.refreshEvent.emit()
        this.title.reset()
        this.description.reset()
        this.snackBar.open("Note Created Successfully..","close", {
          duration: 3000,
        
        });
        
        
      },
      err =>{
        console.log(err)
      } )
    }
  }
  

}
