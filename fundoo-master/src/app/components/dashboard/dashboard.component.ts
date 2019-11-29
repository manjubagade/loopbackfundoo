import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProfilePicComponent } from '../../components/profile-pic/profile-pic.component';
import { DataServiceService } from '../../service/DataService/data-service.service';
import { UserService } from 'src/app/service/UserService/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {CreateLabelComponent} from '../../components/create-label/create-label.component';
import {LabelService} from '../../service/LabelService/label.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mobileQuery: MediaQueryList;


  HeaderName = 'Fundoo'
  email='';
  firstname='';
  lastname='';
  username='';
  imageurl;
  localstorage_image;
  values='';
  isView:Boolean=true;
  private _mobileQueryListener: () => void;




  constructor(private dataService: DataServiceService,private labelService:LabelService,public router:Router ,private snackBar: MatSnackBar,private userService:UserService, public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  allLabels=[]
  getLabels=[]
  ngOnInit() {
   //this.localstorage_image = localStorage.getItem('image')
   this.changeProfilePic()
   this.getNoteLabels()
   this.email = localStorage.getItem('email');
   this.firstname = localStorage.getItem('firstName');
   this.lastname = localStorage.getItem('lastName');
   this.username = this.firstname + this.lastname;

   this.dataService.currentMessage.subscribe(data=>{
    // console.log("checking data",data) 
    if(data.type == 'profile'){
       this.changeProfilePic()
     }
    else if(data.type == 'editlabel'){
      this.getNoteLabels()
    } 
   })
  }
  changeProfile(): void {
    const dialogRef = this.dialog.open(ProfilePicComponent, {
      width: '40%',
      data: ''
    });

  }
  editLable(): void{
    const dialogRef = this.dialog.open(CreateLabelComponent, {
      width: '30%',
      data: ''
    });
  }
  changeProfilePic(){
    this.localstorage_image=localStorage.getItem('image');
    this.imageurl ='http://fundoonotes.incubation.bridgelabz.com/' + this.localstorage_image ;
  }
  logout(){
    this.userService.logout('user/logout',{}).subscribe(data=>{
      console.log(data)
      localStorage.removeItem('token');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('imageUrl');
      //localStorage.removeItem('image');

      localStorage.removeItem('email');
      localStorage.removeItem('userId');
      //localStorage.clear();
      this.snackBar.open("Logged out Successfully..","close", {
        duration: 3000,
      });
      this.router.navigate(['login'])
    })
  }

  searchNotes(event){
    console.log('events in search bar',event)
    //this.router.navigate(['dashboard/search'])
    // console.log("search event information..",event)
    this.values = event.target.value
    //console.log("values information...",this.values)
    this.dataService.changeMessage({
      data:this.values,
      type:'search'})
    
  }
  getingNote(){
    this.router.navigate(['dashboard/search'])

  }
  grid_list(){
    this.isView = !this.isView;
    console.log('view is ',this.isView);
    
    this.dataService.changeMessage({
      data:this.isView,
      type:'grid-list'
    })
  }
  getNoteLabels(){
    this.labelService.getLabel().subscribe(data=>{
      //console.log("labels data...",data)
      this.allLabels = data['data']['details'];
      this.getLabels = this.allLabels.reverse();
      //console.log("got labels..",this.getLabels)

    },
    err=>{
      console.log(err)
    });
  }
}

