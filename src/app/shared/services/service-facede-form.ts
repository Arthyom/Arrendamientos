import { inject, Injectable, signal, computed } from '@angular/core';
import { EnumCommonFormControllType } from '../../models/Interfaces/ECommonFormControllType';
import { EnumTypeProperty } from '../../models/Enums/EnumTypeProperty';
import { ICommonCustomForm } from '../../models/Interfaces/ICommonFormCustom';
import { ActivatedRoute } from '@angular/router';
import { InfiniteLoaderService } from '../../../shared/services/infinite-loader-service';
import { AppOpStateService } from './app-op-state';
import { ServiceArrDataRequester } from './service-arr-data-requester';
import { firstValueFrom } from 'rxjs';
import { Location } from '@angular/common';
import { MapperFormValues } from '../../models/Mappers/MapperFormValues';

@Injectable({
  providedIn: 'root',
})
export class ServiceFacedeForm<Tout> {
  _router!: ActivatedRoute;
  _location!: Location;
  _inf!: InfiniteLoaderService;
  _service!: ServiceArrDataRequester;
  _stateService!: AppOpStateService;

  t = EnumCommonFormControllType;
  tp = EnumTypeProperty;
  resource = signal<string>('');

  inerDataReady = signal<boolean>(false);

  tv!: Tout;

  configs = signal<ICommonCustomForm | undefined>(undefined);

  setInjectors(
    r: ActivatedRoute,
    l: Location,
    i: InfiniteLoaderService,
    s: ServiceArrDataRequester,
    e: AppOpStateService,
    rs: string,
  ) {
    this._router = r;
    this._location = l;
    this._inf = i;
    this._service = s;
    this._stateService = e;
    this.resource.set(rs);
  }

  async loadValuesWithId() {
    const id = Number(this._router.snapshot.paramMap.get('id'));

    this.tv = await firstValueFrom(
      await this._service.getById<Tout>(this.resource(), id),
    );
  }

  setValues(values: ICommonCustomForm) {
    this.configs.set(values);
    this.inerDataReady.set(true);
  }

  async submitForm(values: any) {
    this._inf.showLoader.set(true);

    try {
      const mapped = MapperFormValues.fromObject<Tout>(values);

      const s = await firstValueFrom(
        await this._service.put<Tout>(
          `${this.resource()}/${mapped.id}`,
          mapped,
        ),
      );

      setTimeout(() => {
        this._stateService.setSuccessState(true);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        this._stateService.setErrorState(true);
      }, 1000);
    }

    this._inf.showLoader.set(false);

    this._location.back();
  }

  setStateForLoader(state: boolean) {
    this._inf.showLoader.set(state);
  }
}
