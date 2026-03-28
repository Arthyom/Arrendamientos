import { BaseEntity } from "../base/base-entity";
import { EnumTypeProperty } from "../Enums/EnumTypeProperty";
import { Interior } from "./interior";

export class Propiedad extends BaseEntity {
  alias!: string;
  // nombre!: string;
  precio!: number;
  // typeProperty!: EnumTypeProperty;
  // libre!: boolean;
  direccion!: string;
  // interior?:string;
  municipio!: string;
  colonia!: string;
  cp?: string;
  propiedadId!:string;
  interiores?: Interior[];
}

