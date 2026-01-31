import { FormControl } from "@angular/forms";
import { EnumCommonFormControllType } from "./ECommonFormControllType";
import { IKeyValue } from "./IKeyValue";

export interface ICommonFormControll{
  type?:EnumCommonFormControllType;
  label:any;
  control:  FormControl;
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  order?: number;

  hidden?: boolean;
  additionalData?: IKeyValue[];

}
