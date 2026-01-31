import { ICommonFormControll } from "./ICommonFormControll";
import { IKeyValue } from "./IKeyValue";

export interface ICommonFormGroup{
  label: string;
  controlls: Record<string, ICommonFormControll>;
  order?: number;
}
