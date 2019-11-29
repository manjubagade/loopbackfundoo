import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../service/HttpService/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../service/UserService/user.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any ;
  response : any;
  message = ''
  message_1 = '' 

  userName = new FormControl('',[Validators.required,Validators.email]);
  password = new FormControl('',[Validators.required,Validators.maxLength(16),Validators.minLength(6)]);


  constructor(private userService:UserService,public router:Router ,private snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  userNameErrorMessage(){
    return this.userName.hasError('required') ? 'Enter the userName':
    '';
  }
  paswordErrorMessage(){
    return this.password.hasError('required') ? 'Enter the password':
    this.password.hasError('minLength(6)') ? 'Enter the password length atleast 6 charcters..':
    this.password.hasError('maxLength(15)') ? 'Enter the password length not greaterthan 15 charcters..':
    "";
  }

  getLogin(){
    var field_contents = {
      "email":this.userName.value,
      "password":this.password.value
    }

    console.log(field_contents);
    this.userService.loginService('user/login',field_contents).subscribe(data =>{
      localStorage.setItem('token',data['id']);
      localStorage.setItem('firstName',data['firstName']);
      localStorage.setItem('lastName',data['lastName']);
      localStorage.setItem('imageUrl',data['imageUrl']);
      localStorage.setItem('email',data['email']);
      localStorage.setItem('userId',data['userId']);

      console.log("login details ..",data)

      console.log(field_contents)
      
      this.snackBar.open("Logged Successfully..","close", {
        duration: 3000,
      });
      this.router.navigate(['dashboard'])
    },
    err =>{
      console.log(err)
    } )
    
  }


  forgot_password()
  {
    console.log('jumping to forgot password component..')
    this.router.navigate(['forgot-password'])
  }
  register()
  {
    console.log('jumping to register component..')
    this.router.navigate(['register'])
  }


}
