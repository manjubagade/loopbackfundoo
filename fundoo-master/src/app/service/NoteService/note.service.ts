import { Injectable } from '@angular/core';
import { HttpService } from "../HttpService/http.service";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpService:HttpService) { }

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


  addNote(url,body){
    return this.httpService.postEncode(url,this.encode(body),true);
  }
  getNote(){
    return this.httpService.get('notes/getNotesList',true);
  }
  updateNote(url,body){
    return this.httpService.post(url,body,true);
  }
  deleteNote(url,body){
    return this.httpService.post(url,body,true);
  }
  archiveNote(url,body){
    return this.httpService.post(url,body,true);
  }
  ispined(url,body){
    return this.httpService.post(url,body,true);
  }
  noteColorChange(url,body){
    return this.httpService.post(url,body,true);
  }
  profilePic(url,body){
    return this.httpService.postEncode(url,this.encode(body),true);

  }
  addLabeltoNote(url,body){
    return this.httpService.post(url,body,true);
  }
  deleteLabelNote(url,body){
    return this.httpService.post(url,body,true);
  }
  addRemainder(url,body){
    return this.httpService.post(url,body,true);
  }
  removeRemainder(url,body){
    return this.httpService.post(url,body,true);
  }
  searchUserList(url,body){
    return this.httpService.post(url,body,true);
  }
  addCollaborator(url,body){
    return this.httpService.post(url,body,true);
  }
  deleteNoteCollaborator(url,body){
    return this.httpService.delete(url,true);
  }
  getRemainderNotes(){
    return this.httpService.get('notes/getReminderNotesList',true);
  }

}
