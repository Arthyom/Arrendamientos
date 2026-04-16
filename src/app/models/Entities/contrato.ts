import { BaseEntity } from "../base/base-entity"
import { Arrendatario } from "./arrendatario";
import { Fiador } from "./fiador";

export class Contrato extends BaseEntity {

  arrendadorId!: number ;
  // arrendatarioId!: number;
  propiedadId!: number;
  interiorId!: number;
  fiadorId?: number;
  termino?: Date

  fiador?: Fiador;
  arrendatario?: Arrendatario;

  condicionesAdicionales?: string[];

}
