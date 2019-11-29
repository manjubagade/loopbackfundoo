import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {NoteService} from '../../service/NoteService/note.service';
import {MatSnackBar} from '@angular/material';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserService } from 'src/app/service/UserService/user.service';
import { DataServiceService } from 'src/app/service/DataService/data-service.service';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss']
})
export class ProfilePicComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProfilePicComponent>,public noteService:NoteService,public userService:UserService,
    private snackBar:MatSnackBar,public dataService:DataServiceService) { }

  ngOnInit() {
  }
  imageChangedEvent : any='';
  croppedImage : any='';
  profilepic: File = null;


  getprofilephoto(event){
    console.log("data in event",event)
    this.imageChangedEvent = event;
    this.profilepic = <File>event.target.files[0];
    console.log("profile pic",this.profilepic)
  }

  imageCropped(event: ImageCroppedEvent) {
    console.log("exact file..",event.file);
    
    this.croppedImage = event;
    this.profilepic =<File> event.file;
    console.log("profile pic",this.profilepic)
    
  }

  setprofilephoto(){
    const imagefile = new FormData();
    imagefile.append('file',this.profilepic)
    
    console.log("profile pic",this.profilepic)

    this.userService.profilePic('user/uploadProfileImage',imagefile).subscribe(data=>{
      localStorage.setItem('image',data['status']['imageUrl']);
     //console.log("profile pic information...!",data)
      this.dataService.changeMessage({
        data:{},
        type:'profile'
      })
      this.snackBar.open("profile pic uploaded  Successfully..","close", {
        duration: 3000,
      });
      this.dialogRef.close();

    })
  }
 

  close(){
    this.dialogRef.close();

  }
  cancel(){
    this.dialogRef.close();

  }
}
