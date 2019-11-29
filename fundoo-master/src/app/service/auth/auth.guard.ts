import { Injectable } from '@angular/core';
import { CanActivate,Router} from '@angular/router';
import {AuthserviceService} from '../auth_servive/authservice.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
    constructor(private _authService:AuthserviceService,private _router:Router){}
      
    canActivate():boolean
    {
        if(this._authService.loggedIn())
        {
            return true
        }
        else
        {
            this._router.navigate(['login'])
            return false
        }
    }

  }

