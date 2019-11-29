import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchLabelFilter'
})
export class SearchLabelPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //console.log("pipe values..!",value)
    //console.log("args information..!",args)
    if(!args){
      return value;
    }
    else{
      args=args.toLowerCase();
    }
    return value.filter(item=>{
     
       return item.label.toLowerCase().startsWith(args)

       
      

  })
}

}

