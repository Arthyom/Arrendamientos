import { BaseEntity } from "../base/base-entity";
import { Interior } from "./interior";
import { Propiedad } from "./propiedad";

export class Arrendatario extends BaseEntity{

  nombre!: string;
  apellidoPaterno!: string;
  apellidoMaterno!: string;
  curp?: string;
  rfc?: string;
  alias!: string;
  direccion!: string;
  municipio!: string;
  colonia!: string;
  // propiedad?: Propiedad [];
  // propiedadId! : number;
  telefono!: string;
  cp?: string;
  interiores?: Interior [];

    email?: string;

}
