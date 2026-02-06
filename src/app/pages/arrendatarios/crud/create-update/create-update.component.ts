import { CommonModule, JsonPipe, Location } from '@angular/common';
import {
  Component,
  inject,
  input,
  signal,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NgbAccordionButton,
  NgbAccordionDirective,
  NgbAccordionItem,
  NgbAccordionHeader,
  NgbAccordionToggle,
  NgbAccordionBody,
  NgbAccordionCollapse,
} from '@ng-bootstrap/ng-bootstrap';
import { ICommonCustomForm } from '../../../../models/Interfaces/ICommonFormCustom';
import { ICommonFormGroup } from '../../../../models/Interfaces/ICommonFormGroup';
import { EnumCommonFormControllType } from '../../../../models/Interfaces/ECommonFormControllType';
import { CustomFormComponent } from '../../../../shared/custom-form/custom-form.component';
import { InfiniteLoaderComponent } from '../../../../shared/infinite-loader/infinite-loader.component';
import { ServiceArrDataRequester } from '../../../../shared/services/service-arr-data-requester';
import { Propiedad } from '../../../../models/Entities/propiedad';
import { firstValueFrom } from 'rxjs';
import { IKeyValue } from '../../../../models/Interfaces/IKeyValue';
import { InfiniteLoaderService } from '../../../../../shared/services/infinite-loader-service';
import { ActivatedRoute } from '@angular/router';
import { Arrendatario } from '../../../../models/Entities/arrendatario';
import { MapperFormValues } from '../../../../models/Mappers/MapperFormValues';
import { EnumTypeProperty } from '../../../../models/Enums/EnumTypeProperty';
import { map } from 'jquery';
import { AppOpStateService } from '../../../../shared/services/app-op-state';

@Component({
  selector: 'app-create-update',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CustomFormComponent,
  ],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss',
})
export class CreateUpdateComponent implements OnInit {
  t = EnumCommonFormControllType;
  tp = EnumTypeProperty;

  private _service = inject(ServiceArrDataRequester);
  private _inf = inject(InfiniteLoaderService);
  private _router = inject(ActivatedRoute);
  private _location = inject(Location);
  private _stateService = inject(AppOpStateService);

  private _propiedad: Propiedad | null = null;
  url = signal<string>('arrendatarios');

  s = signal<ICommonCustomForm>({
    groups: {
      infoBase: {
        order: 1,
        label: 'Info. Basica',
        controlls: {
          alias: {
            label: 'Alias',
            control: new FormControl(null, Validators.required),
            additionalData: [{ key: 'placeholder', value: 'Como lo conoces?' }],
          },
          id:{
            order: 0,
            label: 'ID',
            control: new FormControl( null, Validators.required),
            hidden: true,
          },
          nombre: {
            order:3,
            label: 'Nombre',
            control: new FormControl(null, Validators.required),
          },
          apellidoPaterno: {
            order:1,
            label: 'Apellido Paterno',
            control: new FormControl(null, Validators.required),
          },
          apellidoMaterno: {
            order:2,
            label: 'Apellido Materno',
            control: new FormControl(null, Validators.required),
          },
          direccion: {
            order:4,
            label: 'Direccion',
            control: new FormControl(null, Validators.required),
          },
          municipio: {
            order:6,
            label: 'Municipio',
            control: new FormControl(null, Validators.required),
          },
          colonia: {
            order:5,
            label: 'Colonia',
            control: new FormControl(null, Validators.required),
          },
          cp: {
            order:7,
            min: 0,
            max: 99999,
            maxLength: 5,
            minLength: 5,
            pattern: '[0-9]{5}',
            label: 'Codigo Postal',
            control: new FormControl(null, [
              Validators.required,
              // Validators.min(0),
              // Validators.max(99999),
            ]),
          },
          telefono: {
            order:8,
            maxLength: 10,
            type: this.t.textPhone,
            label: 'Telefono ',
            control: new FormControl(null, [
              Validators.required,
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
            type: this.t.comboIntegerInteger,
            label: 'Propiedad',
            control: new FormControl( null, Validators.required),
          },
          interior:{
            label: 'Interior',
            control: new FormControl(),
          },
          typeProperty:{
            type: this.t.comboIntegerInteger,
            label: 'Tipo Propiedad',
            additionalData: this.convertTo(this.tp),
            control: new FormControl(null, Validators.required),
          }
        },
      },

      infoOpcional: {
        order: 3,
        label: 'Info. Opcional',
        controlls: {
          email: {
            label: 'Email',
            control: new FormControl(null, Validators.email),
          },
          curp: {
            label: 'CURP',
            control: new FormControl(),
          },
          rfc: {
            label: 'RFC',
            control: new FormControl(),
          },
        },
      },
    },
  });

  convertTo (type: any){
    return Object.entries(type).map(
      ([key, value]) => {
        return !Number.isNaN(Number(key)) ? { key: key, value: value } : null;
      }
    ).filter(x => x != null) as IKeyValue[];
  }

  async ngOnInit() {
    this._inf.showLoader.set(true);

    const r = await firstValueFrom(
      await this._service.getAll<Propiedad>('propiedades'),
    );

    const id = Number(this._router.snapshot.paramMap.get('id'));

    this.url.update(value => `${value}/${id}`);

    const ar = await firstValueFrom(
      await this._service.getById<Arrendatario>('arrendatarios', id),
    );

    const propAct = r.find(x => x.id === ar.propiedadId);
    this._propiedad = propAct ? {...propAct} : null;
    ar.propiedad = propAct;

    const propiedades = r.map<IKeyValue>((x) => ({
      key: x.id.toString(),
      value: x.direccion,
    }));

    this.s.update((currentS) => {
      currentS.groups['infoAdicional'].controlls['propiedadId'].additionalData =
       [ {key:null, value:'No Asignado'} ,...propiedades ];

      currentS.groups['infoBase'].controlls['nombre'].control.setValue(
        ar.nombre,
      );

      currentS.groups['infoBase'].controlls['apellidoPaterno'].control.setValue(
        ar.apellidoPaterno,
      );

      currentS.groups['infoBase'].controlls['apellidoMaterno'].control.setValue(
        ar.apellidoMaterno,
      );

      currentS.groups['infoBase'].controlls['direccion'].control.setValue(
        ar.direccion,
      );

      currentS.groups['infoBase'].controlls['municipio'].control.setValue(
        ar.municipio,
      );

      currentS.groups['infoBase'].controlls['colonia'].control.setValue(
        ar.colonia,
      );

        currentS.groups['infoBase'].controlls['id'].control.setValue(
        ar.id,
      );

       currentS.groups['infoBase'].controlls['telefono'].control.setValue(
        ar.telefono,
      );

        currentS.groups['infoBase'].controlls['cp'].control.setValue(
        ar.cp,
      );
      currentS.groups['infoBase'].controlls['alias'].control.setValue(
        ar.alias,
      );

      currentS.groups['infoAdicional'].controlls[
        'propiedadId'
      ].control.setValue(ar.propiedadId);

      currentS.groups['infoAdicional'].controlls[
        'typeProperty'
      ].control.setValue(ar.propiedad?.typeProperty);

      currentS.groups['infoAdicional'].controlls[
        'interior'
      ].control.setValue(ar.propiedad?.interior);

      // currentS.groups['infoBase'].controlls['cp'].control.setValue(ar.);
      // currentS.groups['infoBase'].controlls['telefono'].control.setValue(ar.te);
      // currentS.groups['infoOpcional'].controlls['email'].control.setValue(ar.e);
      return currentS;
    });

    this._inf.showLoader.set(false);


  }

  async submitForm(data: any) {
    try {
     const mapped = MapperFormValues.fromObject<Arrendatario>(data);
     mapped.propiedad = this._propiedad;

     mapped.propiedad.interior = data.infoAdicional.interior;
     mapped.propiedad.typeProperty =  Number(data.infoAdicional.typeProperty);
      this._inf.showLoader.set(true);
      const id = Number(this._router.snapshot.paramMap.get('id'));
      const s = await firstValueFrom(
        await this._service.put<Arrendatario>(`arrendatarios/${id}`, mapped),
      );
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
