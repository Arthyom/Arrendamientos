import { BaseEntity } from "../base/base-entity";

export class Propiedad extends BaseEntity {
  alias!: string;
  nombre!: string;
  precio!: number;
  typeProperty!: number;
  libre!: boolean;
  direccion!: string;
  municipio!: string;
  colonia!: string;
  propiedadId!:string;
}

