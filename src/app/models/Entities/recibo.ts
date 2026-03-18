import { BaseEntity } from "../base/base-entity";
import { EnumReciboType } from "../Interfaces/ECommonFormControllType";
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
  subTotal?: number;
  tipoRecibo?: EnumReciboType;
  reImpresion?: ReImpresion[];
  importe?: number;
}

