import { BaseEntity } from "../base/base-entity";
import { EnumTypeProperty } from "../Enums/EnumTypeProperty";
import { Arrendatario } from "./arrendatario";
import { Propiedad } from "./propiedad";

export class Interior extends BaseEntity{
    alias!: string;
    etiqueta!: string;
    precio!: number;
    typeProperty!: EnumTypeProperty;
    libre!: boolean;

    propiedadId!:string;
    propiedad?: Propiedad;
    arrendatario?: Arrendatario;

    direccion!: string;
    interior?:string;
    municipio!: string;
    colonia!: string;

    pagado?: boolean;

    numeroServicioCfe?: string;
    cuentaAgua?:string;
}
