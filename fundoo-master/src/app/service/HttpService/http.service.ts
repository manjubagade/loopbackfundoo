import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { encode } from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  static postRequest: any;
  constructor(private http: HttpClient) { }
  link = environment.baseUrl;


  post(url,data,isTokenReq)
  {
    console.log(data);
    var httpOption={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
 
    console.log("data");
    return this.http.post(this.link+url,data,isTokenReq?httpOption:{});
  }
  delete(url,isTokenReq){
    //console.log(data);
    var httpOption={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
 
    console.log("data");
    return this.http.delete(this.link+url,isTokenReq?httpOption:{});
  }
  

  postEncode(url,data,isTokenReq){
  var httpOption={
    headers:new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage.getItem('token')
    })
  }

  console.log("data");
  return this.http.post(this.link+url,data,isTokenReq?httpOption:{});
}
postWithoutHeader(url,data,isTokenReq){
  var httpOption={
    headers:new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    })
  }

  console.log("data");
  return this.http.post(this.link+url,data,isTokenReq?httpOption:{});
}

get(url,isTokenReq){
  var httpOption={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    })
  }
  return this.http.get(this.link+url,isTokenReq?httpOption:{})
}
}

