import { Directive, OnInit, signal } from '@angular/core';
import { InfiniteLoaderService } from '../../../shared/services/infinite-loader-service';
import { ServiceArrDataRequester } from '../../shared/services/service-arr-data-requester';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IArrCustomTableConfigsInterface } from '../../shared/custom-table/interfaces/IArrCustomTableConfigs.interface';
@Directive()
export abstract class BaseIndexPage<Tin> implements OnInit {

  protected tableConfigs: IArrCustomTableConfigsInterface<Tin> = {
      tableHeaders: [],
      tableTitle: '',
      tableData: [],
  };

  constructor(
    public _inf: InfiniteLoaderService,
    public _baseService: ServiceArrDataRequester,
    public _router: ActivatedRoute
  ) {}

  async ngOnInit() {

    await this.getResourceList();

  }

  async getResourceList(){
    this._inf.showLoader.update((x) => true);
    const title = this._router.snapshot.data['resourceName'];

    this.tableConfigs.tableData =
    await firstValueFrom(await this._baseService.getAll<Tin>(title));

    this._inf.showLoader.update((x) => false);
  }
}
