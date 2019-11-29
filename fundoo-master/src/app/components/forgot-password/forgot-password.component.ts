import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/HttpService/http.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from './../../service/UserService/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  message = ''
  model: any ;
  response : any;
  message_1 = ''

  userName = new FormControl('',[Validators.required,Validators.email]);


  constructor(private userService:UserService,public router:Router,private snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  userNameErrorMessage(){
    return this.userName.hasError('required') ? 'Enter the email-address':
    '';
  }
  Submit(){
    var field_content = {
      
      "email":this.userName.value
    }
    console.log(field_content);
    this.userService.forgotService('user/reset',field_content).subscribe(data =>{
      console.log(field_content)
      this.snackBar.open("Link has been sent to enterred email address for reseting password..","close", {
        duration: 3000,
      });
    },
    err =>{
      console.log(err)
    } )
      
  }










  // Submit(){
  //   try{
  //     this.model = {
          
  //         "userName" : this.userName.value,
          
  //     }
  //     if(this.userName.value == '')
  //     {
  //       this.message = "Fields must be filled."
  //       this.snackBar.open("Fields must be filled empty fields cannot accepted...", "close" ,{ duration: 3000});

  //       return
  //     }
  //     else{
  //         this.httpService.postRequest('/user/register',this.model).subscribe(data =>{
  //           this.response = data ;
  //           this.message_1 = this.response.message
  //           console.log(data)
  //           this.router.navigate(['reset-password'])
  //         },
  //         err =>{
  //           alert('oops something went wrong..!');
  //         })
  //     }
  //   }
  //   catch(err){
  //     this.message="oops something went Wrong.."
  //   }

  // }

}
