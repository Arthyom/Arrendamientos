import { ICommonFormControll } from "./ICommonFormControll";

export interface ICommonFormGroup{
  label: string;
  controlls: Record<string, ICommonFormControll>
}
