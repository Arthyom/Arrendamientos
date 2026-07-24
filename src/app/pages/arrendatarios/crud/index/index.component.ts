import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ServiceArrDataRequester } from '../../../../shared/services/service-arr-data-requester';
import { Arrendatario } from '../../../../models/Entities/arrendatario';
import { IArrCustomTableConfigsInterface } from '../../../../shared/custom-table/interfaces/IArrCustomTableConfigs.interface';
import { CustomTableComponent } from '../../../../shared/custom-table/custom-table.component';
import { ButtonActionsComponent } from '../../../../shared/button-actions/button-actions.component';
import { IonIcon } from '@ionic/angular/standalone';
import { Propiedad } from '../../../../models/Entities/propiedad';
import { catchError, firstValueFrom } from 'rxjs';
import { InfiniteLoaderComponent } from '../../../../shared/infinite-loader/infinite-loader.component';
import { Recibo } from '../../../../models/Entities/recibo';
import { NgTemplateOutlet } from '../../../../../../node_modules/@angular/common/index';
import { CardCollapsableComponent } from '../../../../shared/card-collapsable/card-collapsable.component';
import { NgbSlide } from '../../../../../../node_modules/@ng-bootstrap/ng-bootstrap/carousel/carousel';
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem,
  NgbAccordionToggle,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalContainerComponent } from '../../../../shared/modal-container/modal-container.component';
import { MultiRecipientComponent } from '../../componentes/multi-recipient/multi-recipient.component';
import { IMonthResponse } from '../../interfaces/IMonthResponse';
import { ArrendatarioIconToolComponent } from '../../componentes/arrendatario-icon-tool/arrendatario-icon-tool.component';
import { InfiniteLoaderService } from '../../../../../shared/services/infinite-loader-service';
import { EnumTypeProperty } from '../../../../models/Enums/EnumTypeProperty';
import { ActivatedRoute } from '@angular/router';
import { Interior } from '../../../../models/Entities/interior';
import { MapperRecibos } from '../../../../models/Mappers/MapperRecibos';
import { ServicioArrendatariosFiltros } from '../../services/servicio-arrendatarios-filtros';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    InfiniteLoaderComponent,
    CustomTableComponent,
    ButtonActionsComponent,
    IonIcon,
    CardCollapsableComponent,
    NgbAccordionButton,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionToggle,
    NgbAccordionBody,
    NgbAccordionCollapse,
    ModalContainerComponent,
    MultiRecipientComponent,
    NgbTooltip,
    ArrendatarioIconToolComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent implements OnInit {
  private _arrendatariosService = inject(ServiceArrDataRequester);
  private _propiedadService = inject(ServiceArrDataRequester);

  private _inf = inject(InfiniteLoaderService);
  public showMultiReport = signal(false);
  public signalArrendatarioId = signal(0);
  public signalPropiedadId = signal(0);
  public signalInteriorId = signal(0);
  public signalArrendatario = signal<Arrendatario | null>(null);
  showAlreadyCreatedRecipient = signal(false);

  public filterService = inject(ServicioArrendatariosFiltros);

  t = EnumTypeProperty;

  resourceName = input.required<string>();

  tableConfigs: IArrCustomTableConfigsInterface<Arrendatario> = {
    tableHeaders: ['Alias', 'Propiedad', 'Acciones'],
    tableTitle: 'Arrendatarios',
    tableData: [],
  };

  hideModal($event: any) {
    this.showMultiReport.update(() => !$event);
  }

  async createMultiRecipients($event: IMonthResponse) {
    const promises: Promise<Recibo>[] = [];

    this.hideModal(true);
    this._inf.showLoader.update(() => true);

    const recibos = $event.months.map((month) => {
      const recibo: Recibo = {
        propiedadId: this.signalPropiedadId(),
        identificador: 'test',
        arrendadorId: 1,
        arrendatarioId: this.signalArrendatarioId(),
        pagado: true,
        id: 0,
        fechaPago: `${$event.year}-${month.id.toString().padStart(2, '0')}-01`,
        interiorId: this.signalInteriorId(),
      };
      return recibo;
    });

    const owed: Recibo = {
      propiedadId: this.signalPropiedadId(),
      identificador: 'ss',
      arrendadorId: 1,
      arrendatarioId: this.signalArrendatarioId(),
      fechaPago: null,
      pagado: false,
      id: 0,
      interiorId: this.signalInteriorId(),
      arrendatario: undefined,
    };

    for (const recibo of recibos) {
      if ($event.asPayed) {
        promises.push(
          firstValueFrom(
            await this._arrendatariosService.post<Recibo>('recibos', recibo),
          ),
        );
      } else {
        const url = `${environment.backEndBaseUrl}/recibos/0`;
        owed.fechaPago = recibo.fechaPago
        await firstValueFrom(
          await this._arrendatariosService._httpCliente.patch<Recibo>(
            url,
            owed,
          ),
        );
      }
    }

    try {
      // for (const promise of promises) {
      //   const r = await promise;
      //   const reciboDoc = await this._arrendatariosService.getByIdAsBlob(
      //     'recibos/documento',
      //     r.id,
      //   );
      // }


      const resolved = await Promise.all( (promises) );

      for (const r of resolved) {

        const fileName = this.signalArrendatario()?.nombre + ' - ' + this.signalArrendatario()?.apellidoPaterno + ' - ' + this.signalArrendatario()?.apellidoMaterno + ' - ' + MapperRecibos.extractRecipientFileName(r);

        const reciboDoc = await this._arrendatariosService.getByIdAsBlob(
          'recibos/documento',
          r.id,
          fileName
        );
      }
      this._inf.showLoader.update(() => false);
      await this.getArrendatarios()


    } catch (error) {
      this.showAlreadyCreatedRecipient.set(true);
       setTimeout(() => {
        this.showAlreadyCreatedRecipient.set(false);
              this._inf.showLoader.update(() => false);

      }, 3000);
    }



  }

  openMultiReport(arrId: number, propId: string, interiorId: number, arrendatario: Arrendatario) {
    this.signalArrendatarioId.update(() => arrId);
    this.signalPropiedadId.update(() => Number(propId));
    this.signalInteriorId.update(() => interiorId);
    this.signalArrendatario.update(() => arrendatario);
    this.showMultiReport.update(() => true);
  }

  async createReport(
    arrendatarioId: number,
    propiedadId: number,
    interiorId: number,
    arrendatario: Arrendatario,
  ) {
    this._inf.showLoader.update((x) => (x = true));
    arrendatario.interiores = [];
    const data: Recibo = {
      propiedadId,
      identificador: 'ss',
      arrendadorId: 1,
      arrendatarioId,
      fechaPago: null,
      pagado: true,
      id: 0,
      interiorId,
      arrendatario: undefined,
    };

    debugger;
    let response;
    if (arrendatario.adeudos?.valueOf() || 0 > 0) {
      const url = `${environment.backEndBaseUrl}/recibos/0`;
      response = await firstValueFrom(
        await this._arrendatariosService._httpCliente.patch<Recibo>(url, data),
      );
    } else {
      response = await firstValueFrom(
        await this._arrendatariosService.post<Recibo>('recibos', data),
      );
    }

    if (response != null) {
      const fileName = arrendatario.nombre + ' - ' + arrendatario.apellidoPaterno + ' - ' + arrendatario.apellidoMaterno + ' - ' + MapperRecibos.extractRecipientFileName(response);
      const recibo = await this._arrendatariosService.getByIdAsBlob(
        'recibos/documento',
        response.id,
        fileName,
      );
    }
    await this.getArrendatarios();

    this._inf.showLoader.update((x) => (x = false));
    if (response == null) {
      this.showAlreadyCreatedRecipient.set(true);
      await setTimeout(() => {
        this.showAlreadyCreatedRecipient.set(false);
      }, 3000);
    }
  }

  async createAdeudo(
    arrendatarioId: number,
    propiedadId: number,
    interiorId: number,
  ) {
    this._inf.showLoader.update((x) => (x = true));
    const data: Recibo = {
      propiedadId,
      identificador: 'ss',
      arrendadorId: 1,
      arrendatarioId,
      fechaPago: null,
      pagado: false,
      id: 0,
      interiorId,
      arrendatario: undefined,
    };

    const url = `${environment.backEndBaseUrl}/recibos/0`;

    await firstValueFrom(
      await this._arrendatariosService._httpCliente.patch<Recibo>(url, data),
    );

    // if(response!=null)
    // {
    //   const fileName = MapperRecibos.extractRecipientFileName(response);
    //   const recibo =   await this._arrendatariosService.getByIdAsBlob('recibos/documento', response.id, fileName);
    // }
    await this.getArrendatarios();

    this._inf.showLoader.update((x) => (x = false));
    // if(response==null){
    //   this.showAlreadyCreatedRecipient.set(true);
    //   await setTimeout(() => {
    //    this.showAlreadyCreatedRecipient.set(false)
    //  }, 3000);

    // }
  }

  async ngOnInit() {
    this.filterService.filteredValues.subscribe((data) => {
      this.tableConfigs.tableData = data;
    });
    await this.getArrendatarios();
  }

  private async getArrendatarios() {
    this._inf.showLoader.update((x) => true);

    const response = await firstValueFrom(
      await this._arrendatariosService.getAll<Arrendatario>(
        this.resourceName(),
      ),
    );

    this.filterService.setArrendatariosToFilter(response);
    this.filterService.filterByValidPropertyTypes();
    this._inf.showLoader.update((x) => false);
  }
}
