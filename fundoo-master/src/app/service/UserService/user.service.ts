import { Injectable } from '@angular/core';
import { HttpService } from "../HttpService/http.service";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpService) { }
  encode(data) 
    {
      const formBody = [];
      for (const property in data) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      return formBody.join('&');
    }
  registerService(url,body){
    return this.http.post(url,body,false);
  }
  loginService(url,body){
    return this.http.post(url,body,false);
  }
  resetService(url,body){
    return this.http.post(url,body,true);
  }
  forgotService(url,body){
    return this.http.post(url,body,false);
  }
  profilePic(url,body){
    return this.http.postWithoutHeader(url,body,true);

  }
  logout(url,body){
    return this.http.post(url,body,true);
  }
}
