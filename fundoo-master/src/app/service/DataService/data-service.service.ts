import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private messageSource = new BehaviorSubject({data:'',
                                              type:''});
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  
  changeMessage(data:any) {
    this.messageSource.next(data)

    

  }
}
