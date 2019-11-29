import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { UserService } from '../../service/UserService/user.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  message = ''
  hide = true;
  model: any ;
  response : any;
  messages_1 = '';
  
  firstName = new FormControl('',[Validators.required,Validators.maxLength(20),Validators.minLength(3)]);
  lastName = new FormControl('',[Validators.required,Validators.maxLength(20),Validators.minLength(3)]);
  userName = new FormControl('',[Validators.required,Validators.email]);
  password = new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(16)]);
  confirmPassword = new FormControl('',[Validators.required,Validators.maxLength(16),Validators.minLength(6)]);

  
  constructor(private UserService: UserService ,public router:Router,private snackBar: MatSnackBar ) { }

  ngOnInit() {


  }
  firstNameErrorMessage(){
    return this.firstName.hasError('required') ? 'Enter the firstName':
    '';
  }
  lastNameErrorMessage(){
    return this.lastName.hasError('required') ? 'Enter the lastName':
    '';
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
  confirmpaswordErrorMessage(){
    return this.confirmPassword.hasError('required') ? 'Enter the password':
    this.confirmPassword.hasError('minLength(6)') ? 'Enter the password length atleast 6 charcters..':
    this.confirmPassword.hasError('maxLength(15)') ? 'Enter the password length not greaterthan 15 charcters..':
    "";
  }

  
  getRegister(){
    var field_content = {
      "firstName":this.firstName.value,
      "lastName":this.lastName.value,
      "email":this.userName.value,
      "password":this.password.value,
      "phoneNumber": "",
      "imageUrl": "",
      "service": "Advance",
      "cartId": ""
    }
    console.log(field_content);
    if(this.password.value == this.confirmPassword.value)
    {
      this.UserService.registerService('user/userSignUp',field_content).subscribe(data =>{
        console.log(data,"register data")
        this.snackBar.open("Registered Successfully..","close", {
          duration: 3000,
        });
        this.router.navigate(['login'])
      },
      err =>{
        console.log(err)
      } )
    }
    else{
      this.snackBar.open("Password mismatch you can't register...","close", {
        duration: 3000,
      });
    }
    
  }

}





















// Register(){
  //   try{
  //     this.model = {
  //         "firstName": this.firstName.value,
  //         "lastName" : this.lastName.value,
  //         "userName" : this.userName.value,
  //         "password" : this.password.value,
  //         "confirmPassword" : this.confirmPassword.value, 
  //     }
  //     if(this.firstName.value == '' || this.lastName.value == '' || this.userName.value == '' || this.password.value == '' || this.confirmPassword.value == '')
  //     {
  //       this.message = "Fields must be filled."
  //       this.snackBar.open("Fields must be filled empty fields cannot accepted...", "close" ,{ duration: 3000});
  //       return
  //     }
  //     else{
  //         this.httpService.postRequest('user/userSignUp',this.model).subscribe(data =>{
  //           this.response = data ;
  //           this.messages_1 = this.response.message
  //           console.log(data)
  //           this.router.navigate(['login'])
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

  