import { BaseEntity } from "../base/base-entity";
import { EnumTypeProperty } from "../Enums/EnumTypeProperty";
import { Propiedad } from "./propiedad";

export class Interior extends BaseEntity{
    alias!: string;
    etiqueta!: string;
    precio!: number;
    typeProperty!: EnumTypeProperty;
    libre!: boolean;
    direccion!: string;
    interior?:string;
    municipio!: string;
    colonia!: string;
    propiedadId!:string;
    propiedad?: Propiedad;
}
