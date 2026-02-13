import { map } from "jquery";
import { ICommonCustomForm } from "../Interfaces/ICommonFormCustom";
import { IKeyValue } from "../Interfaces/IKeyValue";

export class MapperFormValues {

  public static  convertTo (type: any){
        return Object.entries(type).map(
          ([key, value]) => {
            return !Number.isNaN(Number(key)) ? { key: key, value: value } : null;
          }
        ).filter(x => x != null) as IKeyValue[];
      }

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
