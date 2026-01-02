import { BaseEntity } from "../base/base-entity";

export class Arrendador extends BaseEntity{
  public nombre!: string;
  public apellidoPaterno!: string;
  public apellidoMaterno!: string;
}
