import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../models/base/BaseComponent';
import { Interior } from '../../../../models/Entities/interior';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { InfiniteLoaderService } from '../../../../../shared/services/infinite-loader-service';
import { ServiceArrDataRequester } from '../../../../shared/services/service-arr-data-requester';
import { AppOpStateService } from '../../../../shared/services/app-op-state';
import { ServiceFacedeForm } from '../../../../shared/services/service-facede-form';
import { FormControl, Validators } from '@angular/forms';
import { CustomFormComponent } from '../../../../shared/custom-form/custom-form.component';
import { EnumTypeProperty } from '../../../../models/Enums/EnumTypeProperty';
import { EnumCommonFormControllType } from '../../../../models/Interfaces/ECommonFormControllType';
import { MapperFormValues } from '../../../../models/Mappers/MapperFormValues';

@Component({
  standalone: true,
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss'],
  imports: [CustomFormComponent],
})
export class CreateUpdateComponent extends BaseComponent<Interior> {
  constructor() {
    super(
      inject(ActivatedRoute),
      inject(Location),
      inject(InfiniteLoaderService),
      inject(ServiceArrDataRequester),
      inject(AppOpStateService),
      inject(ServiceFacedeForm<Interior>),
      'interiores',
    );
  }

  override ngOnDestroy() {
    console.log('destroy');
    this.formService.cleanConfigs();
  }

  override async ngOnInit() {
    this.formService.setStateForLoader(true);

    await this.formService.loadValuesWithId();

    this.formService.setValues({
      groups: {
        infoBase: {
          label: 'Información básica',
          controlls: {

            numeroCuentaCfe: {
              label: 'Número de servicio (CFE)',
              control: new FormControl(
                this.formService.tv.numeroServicioCfe,
              ),
            },

            cuentaAgua: {
              label: 'Cuenta Agua (SMAPAM)',
              control: new FormControl(
                this.formService.tv.cuentaAgua,
              ),
            },

            propiedadPadre:{
              label: 'Propiedad',
              type: EnumCommonFormControllType.slot,
              control: new FormControl(
              ),
            },

            id: {
              label: '',
              type: EnumCommonFormControllType.hidden,
              control: new FormControl(
                this.formService.tv.id,
                Validators.required,
              ),
            },
            alias: {
              label: 'Alias',
              control: new FormControl(
                this.formService.tv.alias,
                Validators.required,
              ),
            },

            typeProperty: {
              label: 'Tipo de propiedad',
              type: EnumCommonFormControllType.comboIntegerInteger,
              additionalData: MapperFormValues.convertTo(EnumTypeProperty),
              control: new FormControl(
                this.formService.tv.typeProperty,
                Validators.required,
              ),
            },

            etiqueta: {
              label: 'Etiqueta',
              control: new FormControl(
                this.formService.tv.etiqueta,
                Validators.required,
              ),
            },





            libre: {
              label: 'Libre',
              type: EnumCommonFormControllType.checkBox,
              control: new FormControl(this.formService.tv.libre),
            },

            precio: {
              label: 'Precio',
              // type: EnumCommonFormControllType.number,
              control: new FormControl(
                this.formService.tv.precio,
                Validators.required,
              ),
            },
          },
        },
      },
    });

    this.formService.setStateForLoader(false);
  }

  async submitForm(value: any) {
    const mapped = MapperFormValues.fromObject<Interior>(value);

    if (this.formService.tv.propiedad?.interiores) {
      this.formService.tv.propiedad.interiores = undefined;
    }

    if (this.formService.tv.arrendatario?.interiores) {
      this.formService.tv.arrendatario.interiores = undefined;
    }

      mapped.propiedad = this.formService.tv.propiedad;
      mapped.arrendatario = this.formService.tv.arrendatario;
      mapped.typeProperty = Number(mapped.typeProperty);

      await this.formService.submitFormRaw(mapped, 'patch');
  }
}
