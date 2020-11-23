import { Pipe, PipeTransform } from '@angular/core';
import {Expedition} from "./model/order";

@Pipe({
  name: 'filterCommande',
  pure: false

})
export class FilterCommandePipe implements PipeTransform {

  transform(items: Expedition[], arg1: string, arg2: number): any {
    if (arg2 == 1) {
      items = items.filter(item => item.client.userName.toUpperCase().indexOf(arg1.toUpperCase()) !== -1);
      console.log(items)
      return items;
    } else if(arg2 ==2){
      let items2:Expedition[]=[];
      items.forEach(item1=>{
        item1.expeditionProducts.forEach(item2=>{
          if (item2.product.name.toUpperCase().indexOf(arg1.toUpperCase()) !== -1){
          items2.push(item1)
        }
        })
      })
      return items2;
    }else {
      return items;
    }
  }

}
