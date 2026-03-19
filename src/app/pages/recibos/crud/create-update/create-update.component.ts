import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteLoaderService } from '../../../../../shared/services/infinite-loader-service';
import { Propiedad } from '../../../../models/Entities/propiedad';
import { AppOpStateService } from '../../../../shared/services/app-op-state';
import { ServiceArrDataRequester } from '../../../../shared/services/service-arr-data-requester';
import { ServiceFacedeForm } from '../../../../shared/services/service-facede-form';
import { JsonPipe, Location } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { EnumTypeProperty } from '../../../../models/Enums/EnumTypeProperty';
import { EnumCommonFormControllType, EnumReciboType } from '../../../../models/Interfaces/ECommonFormControllType';
import { MapperFormValues } from '../../../../models/Mappers/MapperFormValues';
import { CustomFormComponent } from '../../../../shared/custom-form/custom-form.component';
import { Recibo } from '../../../../models/Entities/recibo';
import { Arrendatario } from '../../../../models/Entities/arrendatario';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-update',
  standalone: true,
  imports: [CustomFormComponent],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss',
})
export class CreateUpdateComponent {

  arrendatarios: Arrendatario[] = [];
  propiedades: Propiedad[] = [];

  constructor(
    private _router: ActivatedRoute,
    private _location: Location,
    private _inf: InfiniteLoaderService,
    private _service: ServiceArrDataRequester,
    private _stateService: AppOpStateService,
    public formService: ServiceFacedeForm<Recibo>,
  ) {
    this.formService.setInjectors(
      this._router,
      this._location,
      this._inf,
      this._service,
      this._stateService,
      'recibos',
    );
  }

  async ngOnInit() {
    await this.loadArrendatarios();
    await this.loadPropiedades();

    this.formService.setStateForLoader(true);
    await this.formService.loadValuesWithId();
    this.formService.setValues({
      groups: {
        infoBase: {
          label: 'Info. Basica',
          order: 1,
          controlls: {

            concepto: {
              label: 'Concepto',
              control: new FormControl(
                this.formService.tv.concepto,
                Validators.required,
              ),
            },

            fechaPago: {
              type: EnumCommonFormControllType.date,
              label: 'Fecha de Pago',
              control: new FormControl(
                this.formService.tv.fechaPago,
                Validators.required,
              ),
            },

            total: {
              label: 'Precio Unitario',
              control: new FormControl(
                this.formService.tv.total,
                Validators.required
              ),
            },



            // subTotal: {
            //   type: EnumCommonFormControllType.hidden,
            //   label: 'Subtotal',
            //   control: new FormControl(
            //     this.formService.tv.subTotal,
            //   ),
            // },

             importe: {
              type: EnumCommonFormControllType.number,
              label: 'Importe',
              control: new FormControl(
                this.formService.tv.importe,
              ),
            },

            pagado: {
              type: EnumCommonFormControllType.checkBox,
              label: 'Pagado',
              control: new FormControl(
                this.formService.tv.pagado
              ),
            },

            arrendatarioId: {
              type: EnumCommonFormControllType.comboIntegerInteger,
              label: 'Arrendatario',
              control: new FormControl(
                this.formService.tv.arrendatarioId || 0
              ),
              additionalData: MapperFormValues.convertToKeyValueArray( this.arrendatarios, 'alias')
            },

            propiedadId: {
              type: EnumCommonFormControllType.comboIntegerInteger,
              label: 'Propiedad',
              control: new FormControl(
                this.formService.tv.propiedadId || 0
              ),
              additionalData: MapperFormValues.convertToKeyValueArray( this.propiedades, 'direccion')
            },

            tipoRecibo: {
              type: EnumCommonFormControllType.comboIntegerInteger,
              label: 'Tipo de Recibo',
              control: new FormControl(
               this.formService.tv.tipoRecibo ,
              ),
              additionalData: MapperFormValues.convertTo( EnumReciboType)
            },

            id: {
              label: '',
              hidden: true,
              control: new FormControl(0),
            }

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
    event['infoBase'].arrendadorId = 1;


    const response = await this.formService.submitFormAndResponse( event);
    if(response){
      this.formService._inf.showLoader.set(true);
      await  this._service.getByIdAsBlob('recibos/documento', response.id) ;
      this.formService._inf.showLoader.set(false);
      console.log(response);
    }

  }


  private async loadArrendatarios() {
    this.arrendatarios =  await firstValueFrom( await this._service.getAll<Arrendatario>('arrendatarios') );
  }

  private async loadPropiedades() {
    this.propiedades = await firstValueFrom( await this._service.getAll<Propiedad>('propiedades') );
  }
}
