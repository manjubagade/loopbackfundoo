import { Injectable } from '@angular/core';
import {HttpService} from '../HttpService/http.service'
@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private httpService:HttpService) { }

  getLabel(){
    return this.httpService.get('noteLabels/getNoteLabelList',true);
  }
  addLabel(url,body){
    return this.httpService.post(url,body,true);
  }
  editLabel(url,body){
    return this.httpService.post(url,body,true);
  }
  deleteLabel(url){
    return this.httpService.delete(url,true);
  }
}