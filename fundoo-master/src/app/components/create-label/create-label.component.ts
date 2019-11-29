import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {LabelService} from '../../service/LabelService/label.service';
import { DataServiceService } from '../../service/DataService/data-service.service';
import { Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-create-label',
  templateUrl: './create-label.component.html',
  styleUrls: ['./create-label.component.scss']
})
export class CreateLabelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateLabelComponent>,@Inject(MAT_DIALOG_DATA) public data: object,
  private labelService:LabelService,private dataService:DataServiceService,public snackBar:MatSnackBar) { 
    this.changeText = false;

  }
  changeText: boolean;

  allLabels=[];
  getLabels=[];
  labelsData=[];
  labelname=new FormControl('',[Validators.required])
  userId = localStorage.getItem('userId')
  editname = new FormControl('',[Validators.required])
  labelId:any;
  

  

  ngOnInit() {
    this.dataService.currentMessage.subscribe(data=>{
      // console.log("checking data",data) 
      if(data.type == 'editlabel'){
        this.getNoteLabels()
      } 
     })
    this.getNoteLabels();
    
  }
  
  getNoteLabels(){
    this.labelService.getLabel().subscribe(data=>{
      //console.log("labels data...",data)
      this.allLabels = data['data']['details'];
      this.getLabels = this.allLabels.reverse();
      //console.log("get labels..",this.getLabels)

    },
    err=>{
      console.log(err)
    });
  }
  addLabels(){
    var contents={
      label : this.labelname.value,
      isDeleted : false,
      userId: this.userId
    }
    this.labelService.addLabel('noteLabels',contents).subscribe(data=>{
      //console.log("label added..!",data)
      this.dataService.changeMessage({
        data:{},
        type:'editlabel'
      })
      this.labelname.reset()
      this.snackBar.open("Label Created Successfully..","close", {
        duration: 3000,
      });
    })
    //this.dialogRef.close();

  }
  editLabels(labelid){
    var contents={
      label :this.editname.value,
      isDeleted:false,
      id:labelid,
      userId:this.userId
    }
    this.labelService.editLabel('noteLabels/'+labelid+'/updateNoteLabel',contents).subscribe(data=>{
      //console.log("edit label..!",data)
      this.dataService.changeMessage({
        data:{},
        type:'editlabel'
      })
      this.snackBar.open('Label edited successfully....!',"close",{
        duration:3000,
      });
    },
    err=>{
      console.log(err)
    })
  }
  deleteLabels(labelid){
    var contents={
      id:labelid
    }
    this.labelService.deleteLabel('noteLabels/'+contents.id+'/deleteNoteLabel').subscribe(data=>{
      //console.log("delete label..!",data)
      this.dataService.changeMessage({
        data:{},
        type:'editlabel'
      })
      this.snackBar.open('label deleted successfully..!',"close",{
        duration:3000,});
    },
    err=>{
      console.log(err)
    })
  }
}
