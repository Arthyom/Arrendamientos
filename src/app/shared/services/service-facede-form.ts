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
import { environment } from '../../../environments/environment.development';

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
    if(id>0){
      this.tv = await firstValueFrom(
        await this._service.getById<Tout>(this.resource(), id),
      );
    }
    else{
      this.tv = {} as Tout;
    }
  }

  setValues(values: ICommonCustomForm) {
    this.configs.update((c) => c = values);
    this.inerDataReady.set(true);
  }

  async submitForm(values: any) {
    this._inf.showLoader.set(true);

    try {
      const mapped = MapperFormValues.fromObject<Tout>(values);
      const url = mapped.id ?  `${this.resource()}/${mapped.id}` : `${this.resource()}`;

      if (!this.tv) {
        await firstValueFrom(await this._service.put<Tout>(url, mapped));
      } else {
        await firstValueFrom(
          await this._service._httpCliente.request<Tout>('PATCH', `${environment.backEndBaseUrl}/${url}`, {
            body: mapped,
          }),
        );
      }

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

    async submitFormRaw(values: any, method: string) {
    this._inf.showLoader.set(true);

    try {
      // const mapped = MapperFormValues.fromObject<Tout>(values);
      const url = values.id ?  `${environment.backEndBaseUrl}/${this.resource()}/${values.id}` : `${this.resource()}`;

      const s = await firstValueFrom(
        await this._service._httpCliente.request<Tout>(
          method,
          url,
          {body: values},
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


   async submitFormAndResponse(values: any) {
    this._inf.showLoader.set(true);

    try {
      const mapped = MapperFormValues.fromObject<Tout>(values);
      const url = mapped.id ?  `${this.resource()}/${mapped.id}` : `${this.resource()}`;

      const response = await firstValueFrom(
        await this._service.put<Tout>(
          url,
          mapped,
        ),
      );

      setTimeout(() => {
        this._stateService.setSuccessState(true);
      }, 1000);

      this._inf.showLoader.set(false);

      return response;

    } catch (error) {
      setTimeout(() => {
        this._stateService.setErrorState(true);
      }, 1000);
      this._inf.showLoader.set(false);
      return null;
    }
  }

  setStateForLoader(state: boolean) {
    this._inf.showLoader.set(state);
  }

  cleanConfigs() {
    this.configs.set(undefined);
    this.inerDataReady.set(false);
    this.tv = {} as Tout;
  }
}
