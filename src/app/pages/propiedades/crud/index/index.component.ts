import { Component, inject, OnInit, signal } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { ButtonActionsComponent } from '../../../../shared/button-actions/button-actions.component';
import { ArrendatarioIconToolComponent } from '../../../arrendatarios/componentes/arrendatario-icon-tool/arrendatario-icon-tool.component';
import { CardCollapsableComponent } from '../../../../shared/card-collapsable/card-collapsable.component';
import { CustomTableComponent } from '../../../../shared/custom-table/custom-table.component';
import { Arrendatario } from '../../../../models/Entities/arrendatario';
import { IArrCustomTableConfigsInterface } from '../../../../shared/custom-table/interfaces/IArrCustomTableConfigs.interface';
import { Propiedad } from '../../../../models/Entities/propiedad';
import { InfiniteLoaderService } from '../../../../../shared/services/infinite-loader-service';
import { firstValueFrom } from 'rxjs';
import { ServiceArrDataRequester } from '../../../../shared/services/service-arr-data-requester';
import { PropiedadIconToolComponent } from '../../componentes/propiedad-icon-tool/propiedad-icon-tool.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    PropiedadIconToolComponent,
    IonIcon,
    ButtonActionsComponent,
    ArrendatarioIconToolComponent,
    CardCollapsableComponent,
    CustomTableComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent implements OnInit {
  private _inf = inject(InfiniteLoaderService);
  private _arrendatariosService = inject(ServiceArrDataRequester);
  private _propiedadService = inject(ServiceArrDataRequester);

  public showMultiReport = signal(false);
  public signalArrendatarioId = signal(0);
  public signalPropiedadId = signal(0);

  tableConfigs: IArrCustomTableConfigsInterface<Propiedad> = {
    tableHeaders: ['Alias', 'Propiedad', 'Acciones'],
    tableTitle: 'Arrendatarios',
    tableData: [],
  };


  async ngOnInit() {
    this._inf.showLoader.update((x) => true);
    (
      await this._arrendatariosService.getAll<Propiedad>("Propiedades")
    ).subscribe((data) => {
      this.tableConfigs.tableData = data;
      // data.forEach(async (x) => {
      //   if (x.propiedadId && x.propiedadId > 0) {
      //     x.propiedad = await firstValueFrom(
      //       await this._propiedadService.getById<Propiedad>(
      //         'propiedades',
      //         x.propiedadId,
      //       ),
      //     );
      //   }
      // });
      this._inf.showLoader.update((x) => false);
    });
  }
}
