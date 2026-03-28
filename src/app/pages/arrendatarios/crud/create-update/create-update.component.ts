import { CommonModule, JsonPipe, Location } from '@angular/common';
import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EnumCommonFormControllType } from '../../../../models/Interfaces/ECommonFormControllType';
import { CustomFormComponent } from '../../../../shared/custom-form/custom-form.component';
import { ServiceArrDataRequester } from '../../../../shared/services/service-arr-data-requester';
import { Propiedad } from '../../../../models/Entities/propiedad';
import { firstValueFrom } from 'rxjs';
import { InfiniteLoaderService } from '../../../../../shared/services/infinite-loader-service';
import { ActivatedRoute } from '@angular/router';
import { Arrendatario } from '../../../../models/Entities/arrendatario';
import { MapperFormValues } from '../../../../models/Mappers/MapperFormValues';
import { EnumTypeProperty } from '../../../../models/Enums/EnumTypeProperty';
import { AppOpStateService } from '../../../../shared/services/app-op-state';
import { Interior } from '../../../../models/Entities/interior';
import { ServiceFacedeForm } from '../../../../shared/services/service-facede-form';
import { map } from 'jquery';
import { BaseComponent } from '../../../../models/base/BaseComponent';

@Component({
  selector: 'app-create-update',
  standalone: true,
  imports: [
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CustomFormComponent,
  ],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss',
})
export class CreateUpdateComponent extends BaseComponent<Arrendatario> {
  propiedades: Propiedad[] = [];
  interiores: Interior[] = [];
  interioresByPropiedad = signal<Interior[]>([]);

  selectedProperty = signal<Propiedad | null>(null);
  selectedInterior = signal<Interior | null>(null);

  constructor() {
    super(
      inject(ActivatedRoute),
      inject(Location),
      inject(InfiniteLoaderService),
      inject(ServiceArrDataRequester),
      inject(AppOpStateService),
      inject(ServiceFacedeForm<Arrendatario>),
      'arrendatarios',
    )

  }

  override ngOnDestroy(){
    console.log('destroy');
    this.formService.cleanConfigs();
  }

  override async ngOnInit() {
    this.formService.setStateForLoader(true);
    await this.getPropiedades();
    await this.formService.loadValuesWithId();
    this.formService.setValues({
      groups: {
        infoBase: {
          order: 1,
          label: 'Info. Basica',
          controlls: {
            alias: {
              label: 'Alias',
              control: new FormControl(
                this.formService.tv.alias,
                Validators.required,
              ),
            },
            id: {
              order: 0,
              label: 'ID',
              control: new FormControl(
                this.formService.tv.id,
                Validators.required,
              ),
              hidden: true,
            },
            nombre: {
              order: 3,
              label: 'Nombre',
              control: new FormControl(
                this.formService.tv.nombre,
                Validators.required,
              ),
            },
            apellidoPaterno: {
              order: 1,
              label: 'Apellido Paterno',
              control: new FormControl(
                this.formService.tv.apellidoPaterno,
                Validators.required,
              ),
            },
            apellidoMaterno: {
              order: 2,
              label: 'Apellido Materno',
              control: new FormControl(
                this.formService.tv.apellidoMaterno,
                Validators.required,
              ),
            },
            direccion: {
              order: 4,
              label: 'Direccion',
              control: new FormControl(
                this.formService.tv.direccion,
                Validators.required,
              ),
            },
            municipio: {
              order: 6,
              label: 'Municipio',
              control: new FormControl(
                this.formService.tv.municipio,
                Validators.required,
              ),
            },
            colonia: {
              order: 5,
              label: 'Colonia',
              control: new FormControl(
                this.formService.tv.colonia,
                Validators.required,
              ),
            },
            cp: {
              order: 7,
              min: 0,
              max: 99999,
              maxLength: 5,
              minLength: 5,
              pattern: '[0-9]{5}',
              label: 'Codigo Postal',
              control: new FormControl(this.formService.tv.cp, [
                Validators.required,
                // Validators.min(0),
                // Validators.max(99999),
              ]),
            },
            telefono: {
              order: 8,
              maxLength: 10,
              type: EnumCommonFormControllType.textPhone,
              label: 'Telefono ',
              control: new FormControl(this.formService.tv.telefono, [
                // Validators.pattern('[0-9]{3}-[0-9]{2}-[0-9]{3}'),
              ]),
            },
          },
        },

        infoAdicional: {
          order: 2,
          label: 'Info. Propiedad',
          controlls: {
            propiedadId: {
              type: EnumCommonFormControllType.comboIntegerInteger,
              label: 'Propiedad',
              control: new FormControl(
                this.formService.tv.interiores?.[0]?.propiedadId || 0,
                Validators.required,
              ),
              customFunction: this.getInteriores.bind(this),
              additionalData: MapperFormValues.convertToKeyValueArray(
                this.propiedades,
                'direccion',
              ),
            },
            interiores: {
              type: EnumCommonFormControllType.comboIntegerInteger,
              label: 'Interior',
              control: new FormControl(
                this.formService.tv.interiores?.[0]?.id || 0,
                Validators.required,
              ),
              additionalData: MapperFormValues.convertToKeyValueArray(this.getInterioresBy( this.formService.tv ), 'etiqueta'),
              customFunction: this.setInterior.bind(this),
            },
            typeProperty: {
              type: EnumCommonFormControllType.comboIntegerInteger,
              label: 'Tipo Propiedad',
              additionalData: MapperFormValues.convertTo(EnumTypeProperty),
              control: new FormControl(this.formService.tv.interiores?.[0]?.typeProperty || 0, Validators.required),
            },
          },
        },

        infoOpcional: {
          order: 3,
          label: 'Info. Opcional',
          controlls: {
            email: {
              label: 'Email',
              control: new FormControl(
                this.formService.tv.email,
                Validators.email,
              ),
            },
            curp: {
              label: 'CURP',
              control: new FormControl(this.formService.tv.curp),
            },
            rfc: {
              label: 'RFC',
              control: new FormControl(this.formService.tv.rfc),
            },
          },
        },
      },
    });
    this.formService.setStateForLoader(false);
  }

  getInterioresBy( arrendatario: Arrendatario): Interior[] {
    const propiedadId = arrendatario.interiores?.[0].propiedadId || 0;
    const response = this.propiedades.find((p) => p.id === propiedadId) ;
    if(response){

      this.selectedProperty.set(response);
      this.selectedInterior.set(arrendatario.interiores?.[0] || null);

      return response.interiores || [];
    }
    return [];
  }

  async getInteriores(control: any) {
    this._inf.showLoader.set(true);
    const selectedControl = control.target as HTMLSelectElement;
    const propiedadId = selectedControl.selectedIndex;

    this.selectedProperty.set(
      this.propiedades.find((p) => p.id === propiedadId) || null,
    );

    this.interiores = await firstValueFrom(
      await this._service.getById<Interior[]>(
        `interiores/GetAllByPropiedad`,
        propiedadId,
      ),
    );

    this.formService.configs.update((d) => {
      if (d) {
        d.groups['infoAdicional'].controlls['interiores'].additionalData =
          MapperFormValues.convertToKeyValueArray(this.interiores, 'etiqueta');
      }
      return d;
    });
    this._inf.showLoader.set(false);
  }

  setInterior(control: any) {
    const selectedControl = control.target as HTMLSelectElement;
    const interiorId = selectedControl.selectedIndex;
    this.selectedInterior.set(
      this.interiores.find((i) => i.id === interiorId) || null,
    );
  }

  async getPropiedades() {
    this._inf.showLoader.set(true);
    this.propiedades = await firstValueFrom(
      await this._service.getAll<Propiedad>('Propiedades'),
    );
    this._inf.showLoader.set(false);
  }

  async submitForm(data: any) {
    try {
      const mapped = MapperFormValues.fromObject<Arrendatario>(data);

      mapped.typeProperty = Number(mapped.typeProperty);

      this.selectedProperty.update( (p) =>{
        if(p){
          // p.typeProperty = Number(data.infoAdicional.typeProperty);
          p.interiores = undefined;
        }
        return p;
      });

      this.selectedInterior.update( (i) =>{
        if(i){
          if(this.selectedProperty()){
            i.propiedad = this.selectedProperty() || undefined;
            i.typeProperty= Number (mapped.typeProperty);
            i.arrendatario = {
              id: mapped.id,
              alias: mapped.alias,
              nombre: mapped.nombre,
              apellidoPaterno: mapped.apellidoPaterno,
              apellidoMaterno: mapped.apellidoMaterno,
              direccion: mapped.direccion,
              municipio: mapped.municipio,
              colonia: mapped.colonia,
              cp: mapped.cp,
              telefono: mapped.telefono,
              email: mapped.email,
              curp: mapped.curp,
              rfc: mapped.rfc,
            }
          }

        }
        return i;
      } );

      mapped.interiores = [this.selectedInterior()];

      // data.infoAdicional.interior = [
      //   {
      //     id: data.interiores,
      //     propiedad: {
      //       id: data.PropiedadId,
      //       typeProperty: Number(data.typeProperty),
      //     },
      //   },
      // ];

      // mapped.propiedad.interior = data.infoAdicional.interior;
      // mapped.propiedad.typeProperty = Number(data.infoAdicional.typeProperty);
      this._inf.showLoader.set(true);

      const d = await this.formService.submitFormRaw(mapped, 'patch');

      setTimeout(() => {
        this._stateService.setSuccessState(true);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        this._stateService.setErrorState(true);
      }, 1000);
    } finally {
      this._inf.showLoader.set(false);
      this._location.back();
    }
  }
}
