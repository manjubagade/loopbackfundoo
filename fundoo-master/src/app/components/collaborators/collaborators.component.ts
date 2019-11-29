import { Component, OnInit, Inject } from '@angular/core';
import { NoteService } from '../../service/NoteService/note.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataServiceService } from '../../service/DataService/data-service.service';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss']
})
export class CollaboratorsComponent implements OnInit {
  email = '';
  firstname = '';
  lastname = '';
  username='';
  imageurl;
  localstorage_image;
  values;
  required=[]
  collaborators=[]
  notes=[]
  get_notes=[]
  displayNote=[]

   constructor(public dialogRef: MatDialogRef<CollaboratorsComponent>,private noteService:NoteService,
    public snackBar:MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any,private dataService:DataServiceService) {
    console.log("paseed  data..!",data)
      this.required=data.childMessage.id;
    console.log("required data...",this.required) 
    }
  
  ngOnInit() {
    this.email = localStorage.getItem('email');
   this.firstname = localStorage.getItem('firstName');
   this.lastname = localStorage.getItem('lastName');
   this.username = this.firstname + this.lastname;
   this.localstorage_image=localStorage.getItem('image');
   this.add_collaborators = this.data.childMessage['collaborators'];
   console.log('added collaborators...!',this.add_collaborators)
   this.imageurl ='http://34.213.106.173/' + this.localstorage_image ;
   console.log("child Card value..!",this.data)
  //  this.dataService.currentMessage.subscribe(data=>{
  //    if(data.type == 'deleteCollaborator'){
  //      this.getAllCard()
  //    }
  //  })
  }
  user_list=[]
  add_collaborators=[]
  noteid;

  // select=String;
  searchUserList(event){
    //console.log("user list .....!",event)
    this.values=event.target.value
    var contents={
      searchWord:this.values
  }
  this.noteService.searchUserList('user/searchUserList',contents).subscribe(data=>{
    //console.log('user searchList..!',data)

    this.user_list = data['data'].details
    //console.log('user Array...!',this.user_list)

  })

  }
  addCollaborator(user){
    //console.log("collaborators user data...!",user)
    this.add_collaborators.push(user)
    //console.log("storing into a array...!",this.add_collaborators)

    var contents={
      id:this.required,
      data:{
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        userId:user.userId
      }
    }
    this.noteService.addCollaborator('notes/'+contents.id+'/AddcollaboratorsNotes',contents.data).subscribe(data=>{
      //console.log("adding collaborators...!",data)
      this.dataService.changeMessage({
        data:{},
        type:'addCollaborator'
      })
      this.snackBar.open("note collaborated successfully..!","close",{duration:3000,})


    })

  }
  deleteCollaborator(col){
    //console.log("checking pupose...!",col)
    var contents={
      id:this.required,
      collaboratorUserId:col.userId
    }
    this.noteService.deleteNoteCollaborator('notes/'+contents.id+'/removeCollaboratorsNotes/'+contents.collaboratorUserId,contents).subscribe(data=>{
      //console.log('deleteCollaborator....!',data)
      this.dataService.changeMessage({
        data:{},
        type:'deleteCollaborator'
      })
    })
    this.snackBar.open("Collaborator delete from a note successfully..!","close",{duration:3000,})
    err=>{
      console.log(err)
    }

  }
 
  getAllCard() {
    this.noteService.getNote().subscribe(data => {
      this.notes = data['data']['data'];
      this.get_notes = this.notes.reverse();
      this.displayNote=[]
      //console.log('get_Notes..',this.get_notes)
     
      for (let i = 0; i < this.notes.length; i++) {
        if ((this.get_notes[i]['isDeleted'] == false) && (this.get_notes[i]['isArchived'] == false)) {
            this.displayNote.push(this.get_notes[i]);

        }
      }
      

      //console.log("isdeleted notes",this.displayNote)
      //console.log("is notes",this.displayNote)

      //console.log("reverse order", this.get_notes)
    }, err => {
      console.log(err);

    });
  }
  display(value){
    return value ? value.email : undefined;
  }
  cancel(){
    this.dialogRef.close();

  }
  save(){
    this.dialogRef.close();

  }

}
