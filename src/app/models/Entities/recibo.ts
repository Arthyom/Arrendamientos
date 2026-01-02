import { BaseEntity } from "../base/base-entity";
import { ReImpresion } from "./reimpresion";

export class Recibo extends BaseEntity {

  arrendatarioId!: number;
  reImpresionId?: number;
  arrendadorId!: number;
  propiedadId!: number;
  pagado!: boolean;
  concepto?: string;
  fechaPago!: string | null;
  identificador!: string;
  total?: number;
  reImpresion?: ReImpresion[];
}

