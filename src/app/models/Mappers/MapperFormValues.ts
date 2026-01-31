import { map } from "jquery";
import { ICommonCustomForm } from "../Interfaces/ICommonFormCustom";

export class MapperFormValues {
  public static fromObject<Tout>( input: any ): any {
    const mapped : any = {};

    for (const groupKey in input){
      for (const controll  in input[groupKey]){
        const value = input[groupKey][controll]
        mapped[controll] = value === 'null' ? null : value  ;
      }
    }
    return mapped as Tout;
  }
}
