import { Component, computed, effect, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteLoaderService } from '../../../../../shared/services/infinite-loader-service';
import { Propiedad } from '../../../../models/Entities/propiedad';
import { AppOpStateService } from '../../../../shared/services/app-op-state';
import { ServiceArrDataRequester } from '../../../../shared/services/service-arr-data-requester';
import { ServiceFacedeForm } from '../../../../shared/services/service-facede-form';
import { JsonPipe, Location } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { EnumTypeProperty } from '../../../../models/Enums/EnumTypeProperty';
import {
  EnumCommonFormControllType,
  EnumReciboType,
} from '../../../../models/Interfaces/ECommonFormControllType';
import { MapperFormValues } from '../../../../models/Mappers/MapperFormValues';
import { CustomFormComponent } from '../../../../shared/custom-form/custom-form.component';
import { Recibo } from '../../../../models/Entities/recibo';
import { Arrendatario } from '../../../../models/Entities/arrendatario';
import { firstValueFrom } from 'rxjs';
import { Interior } from '../../../../models/Entities/interior';
import { event, map } from 'jquery';
import { MapperRecibos } from '../../../../models/Mappers/MapperRecibos';

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
  interiores = signal<Interior[]>([]);
  conceptoTemplateConst = `{recipientType} - {PropertyName} {DepNum} - {info}`;

  conceptoTemplate = `{recipientType} - {PropertyName} {DepNum} - {info}`;

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
              order: 5,
              label: 'Concepto',
              control: new FormControl(
                this.formService.tv.concepto || undefined,
                Validators.required,
              ),
              type: EnumCommonFormControllType.textArea,
            },

            fechaPago: {
              order: 6,
              type: EnumCommonFormControllType.date,
              label: 'Fecha de Emision',
              control: new FormControl(
                this.formService.tv.fechaPago,
                Validators.required,
              ),
            },

            total: {
              order: 7,
              label: 'Total',
              control: new FormControl(
                this.formService.tv.total,
                Validators.required,
              ),
              useInformationTool: true,
              informationToolText: 'El total por el que se realizara el recibo',
            },

            importe: {
              type: EnumCommonFormControllType.number,
              label: 'Importe',
              control: new FormControl(this.formService.tv.importe),
              hidden: true,
            },

            pagado: {
              order: 8,
              type: EnumCommonFormControllType.checkBox,
              label: 'Pagado',
              control: new FormControl(this.formService.tv.pagado),
            },

            arrendatarioId: {
              order: 2,
              type: EnumCommonFormControllType.comboIntegerInteger,
              label: 'Arrendatario',
              control: new FormControl(this.formService.tv.arrendatarioId, Validators.required),
              additionalData: MapperFormValues.convertToKeyValueArray(
                this.arrendatarios,
                'alias',
              ),
            },

            propiedadId: {
              order: 3,
              type: EnumCommonFormControllType.comboIntegerInteger,
              label: 'Propiedad',
              control: new FormControl(this.formService.tv.propiedadId, Validators.required),
              additionalData: MapperFormValues.convertToKeyValueArray(
                this.propiedades,
                'direccion',
              ),
              customFunction: this.loadInteriores.bind(this),
            },

            interiorId: {
              order: 4,
              type: EnumCommonFormControllType.comboIntegerInteger,
              label: 'Interior',
              control: new FormControl(this.formService.tv.interiorId, Validators.required),
              additionalData: MapperFormValues.convertToKeyValueArray(
                this.interiores(),
                'alias',
              ),
              customFunction: (event: any)=>{
                const combo = event.target as HTMLSelectElement;

                const selectedInteriores = this.interiores()
                if(selectedInteriores.length > 0){
                  this.setOrInitConceptoTemplate('{DepNum}', selectedInteriores.find(i => i.id === +combo.value)?.etiqueta  || '');
                  this.updateConcepto();
                }
              }
            },

            tipoRecibo: {
              type: EnumCommonFormControllType.comboIntegerInteger,
              order:1,
              label: 'Tipo de Recibo',
              control: new FormControl(this.formService.tv.tipoRecibo, Validators.required),
              additionalData: MapperFormValues.convertTo(EnumReciboType),
              useInformationTool: true,
              informationToolText: 'Selecciona el tipo de recibo a generar',
              customFunction: this.setConceptoTemplate.bind(this),
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

  private updateConcepto() {
        this.formService.configs.update((val) => {
      if (val) {
        val.groups['infoBase'].controlls['concepto'].control.setValue(
          this.conceptoTemplate,
        );
      }

      return val;
    });
  }

  async submitForm(event: any) {
    delete event['infoBase'].pagado;
    event['infoBase'].tipoRecibo = Number(event['infoBase'].tipoRecibo);
    event['infoBase'].identificador = 'test';
    event['infoBase'].arrendadorId = 1;

    const response = await this.formService.submitFormAndResponse(event);
    if (response) {
      this.formService._inf.showLoader.set(true);

      const fileName = MapperRecibos.extractRecipientFileName(response);
      await this._service.getByIdAsBlob('recibos/documento', response.id, fileName);
      this.formService._inf.showLoader.set(false);
      console.log(response);
    }
  }

  private async loadArrendatarios() {
    this.arrendatarios.push({
      id: 0,
      alias: 'Sin Arrendatario',
      nombre: 'Sin Arrendatario',
      apellidoPaterno: '',
      apellidoMaterno: '',
      telefono: '',
      municipio: '',
      colonia: '',
      direccion: '',
      cp: '',
      email: '',
      rfc: '',
    });

    const response = await firstValueFrom(
      await this._service.getAll<Arrendatario>('arrendatarios'),
    );
    this.arrendatarios = [ ...this.arrendatarios, ...response];
  }


  private async loadPropiedades() {

    const defaultPropiedad: Propiedad = {
      id: 0,
      alias: 'Sin Propiedad',
      precio: 0,
      direccion: 'Sin Propiedad',
      municipio: '',
      colonia: '',
      cp: '',
      propiedadId:'',


    };


    const response = await firstValueFrom(
      await this._service.getAll<Propiedad>('propiedades'),
    );

    this.propiedades = [defaultPropiedad, ...response];


  }

  private setConceptoTemplate(event: any) {
    ;
    const combo = event.target as HTMLSelectElement;
    const selectedValue = +combo.value as EnumReciboType;
    switch (selectedValue) {
      case EnumReciboType.deposito:
        this.setOrInitConceptoTemplate('{recipientType}', 'Deposito');
        break;

      case EnumReciboType.normal:
        this.setOrInitConceptoTemplate('{recipientType}', 'Renta');
        break;

      case EnumReciboType.liquidacion:
        this.setOrInitConceptoTemplate('{recipientType}', 'Liquidacion');
        break;

      case EnumReciboType.libre:
        this.setOrInitConceptoTemplate('{recipientType}', 'Libre');
        break;



      default:
        break;
    }
    this.updateConcepto();
  }

  private setConceptoGlobal() {
    this.formService.configs.update((val) => {
      if (val) {
        val.groups['infoBase'].controlls['concepto'].control.setValue(
          this.conceptoTemplate,
        );
      }

      return val;
    });
  }

  private async loadInteriores(event: any) {



    this._inf.showLoader.set(true);
    const combo = event.target as HTMLSelectElement;
    ;

    const defaultInterior: Interior = {
      id: 0,
      alias: 'Sin Interior',
      etiqueta: '',
      colonia: '',
      municipio: '',
      libre: false,
      direccion: '',
      typeProperty: EnumTypeProperty.Casa,
      precio: 0,
      interior: '',
      propiedadId: ''
    };

    const ints =  await firstValueFrom(
      await this._service.getById<Interior[]>(
        'Interiores/GetAllByPropiedad',
        +combo.value,
      ),
    );


    const newInts = [defaultInterior, ...ints];

    this.interiores.set(newInts);
    const mappedResponse =
      MapperFormValues.convertToKeyValueArray(newInts, 'alias') ?? [];
    this.setOrInitConceptoTemplate('{PropertyName}', combo.options[combo.selectedIndex].text);

    this.updateConcepto();

    this.formService.configs.update((val) => {
      if (val) {
        val.groups['infoBase'].controlls['interiorId'].additionalData =
          mappedResponse;
      }

      return val;
    });

    this._inf.showLoader.set(false);
  }


  private setOrInitConceptoTemplate(marker :string, value: string) {

    if(this.conceptoTemplate.includes(marker)){
      this.conceptoTemplate = this.conceptoTemplate.replace(marker, value);
    }else{
      const constTemplateSplited = this.conceptoTemplateConst.split(' - ');
      const modifiesConceptoTemplate = this.conceptoTemplate.split(' - ');
      const markerIndex = constTemplateSplited.findIndex(m => m === marker);
      if(markerIndex >=0){

        modifiesConceptoTemplate[markerIndex] = value;

        this.conceptoTemplate = modifiesConceptoTemplate.join(' - ');

      }
    }

  }


}
