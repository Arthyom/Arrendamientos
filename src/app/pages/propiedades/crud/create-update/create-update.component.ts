import {
  AfterViewInit,
  Component,
  computed,
  inject,
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

@Component({
  selector: 'app-create-update',
  standalone: true,
  imports: [CustomFormComponent, JsonPipe],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss',
})
export class CreateUpdateComponent implements OnInit {
  constructor(
    private _router: ActivatedRoute,
    private _location: Location,
    private _inf: InfiniteLoaderService,
    private _service: ServiceArrDataRequester,
    private _stateService: AppOpStateService,
    public formService: ServiceFacedeForm<Propiedad>,
  ) {
    this.formService.setInjectors(
      this._router,
      this._location,
      this._inf,
      this._service,
      this._stateService,
      'propiedades',
    );
  }

  async ngOnInit() {
    this.formService.setStateForLoader(true);
    await this.formService.loadValuesWithId();
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

            nombre: {
              label: 'Nombre',
              control: new FormControl(
                this.formService.tv.nombre,
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

            interior: {
              label: 'Interior',
              control: new FormControl(
                this.formService.tv.interior,
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
            libre: {
              label: 'Libre',
              control: new FormControl(this.formService.tv.libre),
              type: EnumCommonFormControllType.checkBox,
            },

            typeProperty: {
              additionalData: MapperFormValues.convertTo(EnumTypeProperty),
              type: EnumCommonFormControllType.comboIntegerInteger,
              label: 'Tipo de Propiedad',
              control: new FormControl(this.formService.tv.typeProperty),
            },
          },
        },
      },
    });

    this.formService.setStateForLoader(false);
  }

  async submitForm(event: any) {
    await this.formService.submitForm(event);
  }
}
