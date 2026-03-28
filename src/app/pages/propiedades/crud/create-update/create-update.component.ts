import {
  AfterViewInit,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { EnumTypeProperty } from '../../../../models/Enums/EnumTypeProperty';
import { EnumCommonFormControllType } from '../../../../models/Interfaces/ECommonFormControllType';
import { ICommonCustomForm } from '../../../../models/Interfaces/ICommonFormCustom';
import { CustomFormComponent } from '../../../../shared/custom-form/custom-form.component';
import { InfiniteLoaderService } from '../../../../../shared/services/infinite-loader-service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Arrendatario } from '../../../../models/Entities/arrendatario';
import { Propiedad } from '../../../../models/Entities/propiedad';
import { ServiceArrDataRequester } from '../../../../shared/services/service-arr-data-requester';
import { JsonPipe, Location } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { IKeyValue } from '../../../../models/Interfaces/IKeyValue';
import { AppOpStateService } from '../../../../shared/services/app-op-state';
import { event } from 'jquery';
import { MapperFormValues } from '../../../../models/Mappers/MapperFormValues';
import { ServiceFacedeForm } from '../../../../shared/services/service-facede-form';
import { Interior } from '../../../../models/Entities/interior';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../../../../models/base/BaseComponent';

@Component({
  selector: 'app-create-update',
  standalone: true,
  imports: [CustomFormComponent, JsonPipe, NgbAlert],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss',
})
export class CreateUpdateComponent extends BaseComponent<Propiedad> {
  interiores: Interior[] = [];

  constructor() {
    super(
      inject(ActivatedRoute),
      inject(Location),
      inject(InfiniteLoaderService),
      inject(ServiceArrDataRequester),
      inject(AppOpStateService),
      inject(ServiceFacedeForm),
      'propiedades',
    );
  }

  override ngOnDestroy(): void {
    this.formService.cleanConfigs();
  }

  override async ngOnInit() {
    this.formService.setStateForLoader(true);
    await this.formService.loadValuesWithId();
    await this.getInteriores();
    this.formService.setValues({
      groups: {
        infoBase: {
          label: 'Info. Basica',
          order: 1,
          controlls: {
            alias: {
              label: 'Alias',
              control: new FormControl(
                this.formService.tv.alias,
                Validators.required,
              ),
            },

            precio: {
              label: 'Precio',
              control: new FormControl(
                this.formService.tv.precio,
                Validators.required,
              ),
            },

            direccion: {
              label: 'Direccion',
              control: new FormControl(
                this.formService.tv.direccion,
                Validators.required,
              ),
            },

            municipio: {
              label: 'Municipio',
              control: new FormControl(
                this.formService.tv.municipio,
                Validators.required,
              ),
            },

            cp:{
              label: 'Codigo Postal',
              maxLength: 5,
              minLength: 5,
              control: new FormControl(
                this.formService.tv.cp,
                Validators.required,
              ),
            },

            id: {
              label: '',
              hidden: true,
              control: new FormControl(this.formService.tv.id),
            },

            colonia: {
              label: 'colonia',
              control: new FormControl(
                this.formService.tv.colonia,
                Validators.required,
              ),
            },
          },
        },

        infoAdicional: {
          label: 'Info. Adicional',
          controlls: {
            interiores: {
              label: 'Interiores',
              additionalData: MapperFormValues.convertToKeyValueArray(
                this.interiores,
                'etiqueta',
              ),
              type: EnumCommonFormControllType.comboIntegerInteger,
              control: new FormControl(null),
            },

            slotInteriores: {
              label: 'slot-interiores',
              type: EnumCommonFormControllType.slot,
              control: new FormControl(null),
            }
          },
        },
      },
    });

    this.formService.setStateForLoader(false);
  }

  async getInteriores() {
    if (!this.formService.tv.id) return;
    this.interiores = await firstValueFrom(
      await this._service.getById<Interior[]>(
        'interiores/GetAllByPropiedad',
        this.formService.tv.id,
      ),
    );
  }

  async submitForm(event: any) {
    debugger;
    event.infoBase.Nombre = "Test";
    this.formService.tv.interiores?.forEach((interior) => interior.propiedad = this.formService.tv)
    this.formService.tv.interiores?.forEach((interior) => interior.propiedad!.interiores = [])
    event.infoAdicional = {
      interiores: this.formService.tv.interiores,
    };
    await this.formService.submitForm(event);
  }

  closeAndRemoveItem(interior: Interior) {

    this.formService.tv.interiores = this.formService.tv.interiores
    ?.filter((i) => i.id !== interior.id);
  }
}
