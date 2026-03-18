import { BaseEntity } from "../base/base-entity"

export class Contrato extends BaseEntity {

  arrendadorId!: number ;
  // arrendatarioId!: number;
  propiedadId!: number;
  interiorId!: number;
  fiadorId?: number;
  termino?: Date

}
