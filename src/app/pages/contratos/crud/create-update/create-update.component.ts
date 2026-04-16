import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { JsonPipe, KeyValuePipe, Location } from '@angular/common';
import { CustomFormComponent } from '../../../../shared/custom-form/custom-form.component';
import { Interior } from '../../../../models/Entities/interior';
import { Contrato } from '../../../../models/Entities/contrato';
import { IonIcon } from "@ionic/angular/standalone";
import { NgbAccordionItem } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-create-update',
  standalone: true,
  imports: [KeyValuePipe, JsonPipe, CustomFormComponent, IonIcon, NgbAccordionItem, ReactiveFormsModule],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss',
})
export class CreateUpdateComponent implements OnInit {
  arrendatarios: Arrendatario[] = [];
  propiedades: Propiedad[] = [];
  interiores: Interior[] = [];
  fgAdditionalCondition = signal<FormGroup | null>(null);

  constructor(
    private _router: ActivatedRoute,
    private _location: Location,
    private _inf: InfiniteLoaderService,
    private _service: ServiceArrDataRequester,
    private _stateService: AppOpStateService,
    public formService: ServiceFacedeForm<Contrato>,
    private _fb: FormBuilder
  ) {
    this.formService.setInjectors(
      this._router,
      this._location,
      this._inf,
      this._service,
      this._stateService,
      'contratos',
    );

    this.fgAdditionalCondition.set( null );
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
              control: new FormControl(null, Validators.required),
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
        infoBasicaFiador: {
          label: 'Info Base Fiador',
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
              control: new FormControl(null, Validators.required),
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

        infoBasePropiedad: {
          label: 'Info. Propiedad',
          order: 1,
          controlls: {
            arrendadorId: {
              type: EnumCommonFormControllType.hidden,
              label: '',
              control: new FormControl(
                1,
                Validators.required,
              ),
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
              control: new FormControl(
                this.formService.tv.interiorId,
                Validators.required,
              ),
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
        condicionesAdicionales: {
          label: 'Condiciones Adicionales',
          order: 2,
          controlls: {
            fechaInicio: {
              type: EnumCommonFormControllType.slot,
              label: 'aditionalConditions',
              control: new FormControl(null),
            },
          },
        },
      },
    });

    this.formService.setStateForLoader(false);
  }

  async submitForm(event: any) {
    // delete event['infoBase'].pagado;
    // event['infoBase'].tipoRecibo = Number(event['infoBase'].tipoRecibo);
    // event['infoBase'].identificador = 'test';
    event['condicionesAdicionales'] = [];

    debugger

    for (const key in this.fgAdditionalCondition()?.value) {
      event['condicionesAdicionales'].push (
       this.fgAdditionalCondition()?.value[key]
      )
    }


    const mappedPayload : Contrato  = {
      arrendadorId: 1,
      interiorId: event['infoBasePropiedad'].interiorId,
      propiedadId: event['infoBasePropiedad'].propiedadId,
      arrendatario: event['infoBasicaArrendatario'],
      condicionesAdicionales: event['condicionesAdicionales'].join(','),
      fiador: event['infoBasicaFiador'],
      id: 0
    };

    debugger

    const response = await this.formService.submitFormAndResponse(mappedPayload);
    if (response) {
      this.formService._inf.showLoader.set(true);
      await this._service.getByIdAsBlob('contratos/documento', response.id);
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
    this.interiores = await firstValueFrom(
      await this._service.getById<Interior[]>(
        'interiores/getAllByPropiedad',
        Number(valueSelected),
      ),
    );
    this._inf.showLoader.set(false);

    this.formService.configs.update((d) => {
      if (d) {
        d.groups['infoBasePropiedad'].controlls['interiorId'].additionalData =
          MapperFormValues.convertToKeyValueArray(this.interiores, 'alias');
      }

      return d;
    });

    // this.interiores.set( i );

    console.log('logevent', event);
    // alert('cargar interiores');
  }

  removeCondition(controlName:string) {
    this.fgAdditionalCondition.update( (d) =>{
      d?.removeControl(controlName!);
      return d;
    });
  }

  addNewAdditionalCondition(evento: any) {
    const item = evento.target as HTMLTextAreaElement;
    const id = crypto.randomUUID();

    if(this.fgAdditionalCondition()){
      this.fgAdditionalCondition.update( d => {
        d?.addControl(id, new FormControl(null, Validators.required));
        return d;
      })
    }
    else{
      this.fgAdditionalCondition.set(this._fb.group({ [id]: new FormControl(null, Validators.required) }));
    }

  }
}
