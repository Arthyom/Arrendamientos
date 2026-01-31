import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, inject, Injectable, InjectionToken } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { FileSaverService } from 'ngx-filesaver';

// export const RESOURCE_NAME =  new InjectionToken<string>('RESOURCE_NAME');

@Injectable({
  providedIn: 'root',
})
export class ServiceArrDataRequester {
  private _httpCliente = inject(HttpClient);
  private _fileSaver = inject(FileSaverService);

  // private _resourceName = inject( RESOURCE_NAME  );

  public async getAll<TData>(
    resourceName: string
  ): Promise<Observable<TData[]>> {
    return this._httpCliente.get<TData[]>(
      `${environment.backEndBaseUrl}/${resourceName}`
    );
  }

  public async getById<TData>(
    resourceName: string,
    id: number
  ): Promise<Observable<TData>> {
    return this._httpCliente.get<TData>(
      `${environment.backEndBaseUrl}/${resourceName}/${id}`
    );
  }

  public async getByIdAsBlob(
    resourceName: string,
    id: number
  ): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this._httpCliente.get(
          `${environment.backEndBaseUrl}/${resourceName}/${id}`,
          { responseType: 'blob' , observe: 'response' }
        )
      );

  const contentDisposition = response.headers.get('content-disposition');

      this._fileSaver.save(response.body, 'tes.pdf');

    } catch (error) {
      return false;
    }

    return true;
  }

  public async post<TData>(
    resourceName: string,
    data: TData
  ): Promise<Observable<TData>> {
    return this._httpCliente.post<TData>(
      `${environment.backEndBaseUrl}/${resourceName}`,
      data
    );
  }

  public async put<TData>(
    resourceName: string,
    data: TData
  ): Promise<Observable<TData>> {
    return this._httpCliente.put<TData>(
      `${environment.backEndBaseUrl}/${resourceName}`,
      data
    );
  }
}
