import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/HttpService/http.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../service/UserService/user.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  message = ''
  model: any
  
  password = new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]);
  confirmPassword = new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]);
  
  constructor(private UserService:UserService,public router:Router,private snackBar: MatSnackBar,private route:ActivatedRoute ) {
    const token: string = route.snapshot.params["token"];
    localStorage.setItem('token',token)
    console.log(token);


   }

  ngOnInit() {
  }

  paswordErrorMessage(){
    return this.password.hasError('required') ? 'Enter the password':
    this.password.hasError('minLength(6)') ? 'Enter the password length atleast 6 charcters..':
    this.password.hasError('maxLength(15)') ? 'Enter the password length not greaterthan 15 charcters..':
    "";
  }
  confirmpaswordErrorMessage(){
    return this.confirmPassword.hasError('required') ? 'Enter the password':
    this.confirmPassword.hasError('minLength(6)') ? 'Enter the password length atleast 6 charcters..':
    this.confirmPassword.hasError('maxLength(15)') ? 'Enter the password length not greaterthan 15 charcters..':
    "";
  }


  getReset(){
    var field_content = {
     
      "newPassword":this.password.value
    }
    console.log(field_content);
    if(this.password.value == this.confirmPassword.value)
    {
      this.UserService.resetService('user/reset-password',field_content).subscribe(data =>{
        // console.log(field_content)
        this.snackBar.open("Reset-Password Successfully Done..","close", {
          duration: 3000,
        });
        this.router.navigate(['login'])
      },
      err =>{
        console.log(err)
      } )
    }
    
  }







  // Reset()
  // {
  //   try{
  //     this.model = {
          
  //         "password" : this.password.value,
  //         "confirmPassword" : this.confirmPassword.value, 
  //     }
  //     if(this.password.value == '' || this.confirmPassword.value == '' )
  //     {
  //       this.message = "Fields must be filled."
  //       this.snackBar.open("Fields must be filled empty fields cannot accepted...", "close" ,{ duration: 3000});

  //       return
  //     }
  //     else if(this.password.value != this.confirmPassword.value)
  //     {
  //       this.message = "password missmatch...!"
  //       this.snackBar.open("password missmatch...!", "close" ,{ duration: 3000});

  //     }
      
  //     else{
  //         this.httpService.postRequest('/user/reset-password',this.model).subscribe(data =>{
  //           console.log(data)
  //           this.router.navigate(['login'])
  //         },
  //         err =>{
  //           alert('oops something went wrong..!')
  //         })
  //     }
  //   }
  //   catch(err){
  //     this.message="oops something went Wrong.."
  //   }
  // }
}
