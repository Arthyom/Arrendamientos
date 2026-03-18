import { Component, OnInit, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { InfiniteLoaderService } from '../../../../../shared/services/infinite-loader-service';
import { Arrendatario } from '../../../../models/Entities/arrendatario';
import { Propiedad } from '../../../../models/Entities/propiedad';
import { Recibo } from '../../../../models/Entities/recibo';
import {
  EnumCommonFormControllType,
  EnumReciboType,
} from '../../../../models/Interfaces/ECommonFormControllType';
import { MapperFormValues } from '../../../../models/Mappers/MapperFormValues';
import { AppOpStateService } from '../../../../shared/services/app-op-state';
import { ServiceArrDataRequester } from '../../../../shared/services/service-arr-data-requester';
import { ServiceFacedeForm } from '../../../../shared/services/service-facede-form';
import { JsonPipe, Location } from '@angular/common';
import { CustomFormComponent } from '../../../../shared/custom-form/custom-form.component';
import { Interior } from '../../../../models/Entities/interior';
import { Contrato } from '../../../../models/Entities/contrato';

@Component({
  selector: 'app-create-update',
  standalone: true,
  imports: [JsonPipe, CustomFormComponent],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss',
})
export class CreateUpdateComponent implements OnInit {
  arrendatarios: Arrendatario[] = [];
  propiedades: Propiedad[] = [];
  interiores: Interior[] = [];


  constructor(
    private _router: ActivatedRoute,
    private _location: Location,
    private _inf: InfiniteLoaderService,
    private _service: ServiceArrDataRequester,
    private _stateService: AppOpStateService,
    public formService: ServiceFacedeForm<Contrato>,
  ) {
    this.formService.setInjectors(
      this._router,
      this._location,
      this._inf,
      this._service,
      this._stateService,
      'contratos',
    );
  }

  async ngOnInit() {
    await this.loadArrendatarios();
    await this.loadPropiedades();

    this.formService.setStateForLoader(true);
    await this.formService.loadValuesWithId();
    this.formService.setValues({
      groups: {
        infoBasicaArrendatario: {
          label: 'Info Base Arrendatario',
          order: 0,
          controlls: {
            nombre: {
              label: 'Nombre',
              control: new FormControl(null, Validators.required),
            },
            apellidoPaterno: {
              label: 'Apellido Paterno',
              control: new FormControl(null, Validators.required),
            },
            apellidoMaterno: {
              label: 'Apellido Materno',
              control: new FormControl(null, Validators.required  ),
            },
            telefono: {
              label: 'telefono',
              control: new FormControl(null, Validators.required),
            },
            alias: {
              label: 'Alias',
              control: new FormControl(null, Validators.required),
            },
            direccion: {
              label: 'Direccion',
              control: new FormControl(null, Validators.required),
            },
            municipio: {
              label: 'Municipio',
              control: new FormControl(null, Validators.required),
            },
            colonia: {
              label: 'Colonia',
              control: new FormControl(null, Validators.required),
            },
          },
        },
        infoAdicionalArrendatario: {
          label: 'Info Extra Arrendatario',
          order: 0,
          controlls: {
            cp: {
              type: EnumCommonFormControllType.number ,
              label: 'Código Postal',
              control: new FormControl(),
            },
            rfc: {
              label: 'RFC',
              control: new FormControl(),
            },
            curp: {
              label: 'CURP',
              control: new FormControl(),
            }
          }
        },
        infoBasePropiedad: {
          label: 'Info. Propiedad',
          order: 1,
          controlls: {

            arrendadorId: {
              type: EnumCommonFormControllType.hidden,
              label: '',
              control: new FormControl(this.formService.tv.arrendadorId, Validators.required),
            },

            propiedadId: {
              type: EnumCommonFormControllType.comboIntegerInteger,
              label: 'Propiedad',
              control: new FormControl(null, Validators.required),
              additionalData: MapperFormValues.convertToKeyValueArray(
                this.propiedades,
                'direccion',
              ),
              customFunction: this.loadInteriores.bind(this),

            },

            interiorId: {
              type: EnumCommonFormControllType.comboIntegerInteger,
              label: 'Interior',
              control: new FormControl(this.formService.tv.interiorId, Validators.required),
              additionalData: MapperFormValues.convertToKeyValueArray(
                this.interiores,
                'etiqueta',
              ),
            },

            id: {
              label: '',
              hidden: true,
              control: new FormControl(0),
            },
          },
        },
      },
    });

    this.formService.setStateForLoader(false);
  }

  async submitForm(event: any) {
    delete event['infoBase'].pagado;
    event['infoBase'].tipoRecibo = Number(event['infoBase'].tipoRecibo);
    event['infoBase'].identificador = 'test';

    const response = await this.formService.submitFormAndResponse(event);
    if (response) {
      this.formService._inf.showLoader.set(true);
      await this._service.getByIdAsBlob('recibos/documento', response.id);
      this.formService._inf.showLoader.set(false);
      console.log(response);
    }
  }

  private async loadArrendatarios() {
    this.arrendatarios = await firstValueFrom(
      await this._service.getAll<Arrendatario>('arrendatarios'),
    );
  }

  private async loadPropiedades() {
    this.propiedades = await firstValueFrom(
      await this._service.getAll<Propiedad>('propiedades'),
    );
  }

  async loadInteriores(event: any) {
    const select = event.target as HTMLSelectElement;
    const indexSelected = select.selectedIndex;
    const valueSelected = select.options[indexSelected].value;

    this._inf.showLoader.set(true);
    this.interiores = await firstValueFrom( await this._service.getById<Interior[]>('interiores/getAllByPropiedad', Number(valueSelected)) ) ;
    this._inf.showLoader.set(false);



    this.formService.configs.update( d => {


      if(d){
        d
        .groups['infoBasePropiedad']
        .controlls['interiorId']
        .additionalData = MapperFormValues.convertToKeyValueArray(
          this.interiores,
          'alias',
        );


      }



      return d;
    })



    // this.interiores.set( i );

    console.log('logevent',event);
    // alert('cargar interiores');
  }
}
