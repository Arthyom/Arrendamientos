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
import { NgTemplateOutlet } from "../../../../../../node_modules/@angular/common/index";
import { CardCollapsableComponent } from "../../../../shared/card-collapsable/card-collapsable.component";
import { NgbSlide } from "../../../../../../node_modules/@ng-bootstrap/ng-bootstrap/carousel/carousel";
import { NgbAccordionBody, NgbAccordionButton, NgbAccordionCollapse, NgbAccordionDirective, NgbAccordionHeader, NgbAccordionItem, NgbAccordionToggle, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ModalContainerComponent } from '../../../../shared/modal-container/modal-container.component';
import { MultiRecipientComponent } from '../../componentes/multi-recipient/multi-recipient.component';
import { IMonthResponse } from '../../interfaces/IMonthResponse';
import { ArrendatarioIconToolComponent } from "../../componentes/arrendatario-icon-tool/arrendatario-icon-tool.component";
import { InfiniteLoaderService } from '../../../../../shared/services/infinite-loader-service';
import { EnumTypeProperty } from '../../../../models/Enums/EnumTypeProperty';


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
    ArrendatarioIconToolComponent
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

  t = EnumTypeProperty;


  resourceName = input.required<string>();

  tableConfigs: IArrCustomTableConfigsInterface<Arrendatario> = {
    tableHeaders: ['Alias', 'Propiedad', 'Acciones'],
    tableTitle: 'Arrendatarios',
    tableData: [],
  };


  hideModal($event: any) {
    this.showMultiReport.update( ()=> !$event)
  }

  async createMultiRecipients($event: IMonthResponse){

    console.log('events', $event)
    const promises : Promise<Recibo>[] = [];

    this.hideModal(true);
    this._inf.showLoader.update( ()=> true)

    const recibos = $event.months.map( month =>{
       const recibo: Recibo ={
        propiedadId: this.signalArrendatarioId(),
        identificador:'test',
        arrendadorId:1,
        arrendatarioId: this.signalArrendatarioId(),
        pagado: true,
        id:0,
        fechaPago: `${$event.year}-${month.id.toString().padStart(2, '0')}-01`
       }
       return recibo;
    });

    for (const recibo of recibos) {
      promises.push(
        firstValueFrom(
          await
          this._arrendatariosService.post<Recibo>('recibos', recibo)
        )
      );
    }

    for (const promise of promises) {
      const r = await promise;

      console.log('this is the already resolved promise', r)

      const reciboDoc =   await this._arrendatariosService.getByIdAsBlob('recibos/documento', r.id);
    }

    this._inf.showLoader.update( ()=> false)




  }

  openMultiReport(arrId:number, propId:number) {
    this.signalArrendatarioId.update( () => arrId);
    this.signalPropiedadId.update( () => propId)
    this.showMultiReport.update(  () => true)
  }

  async createReport(arrendatarioId: number, propiedadId: number) {
    this._inf.showLoader.update(x => x = true)
    const data: Recibo = {
      propiedadId,
      identificador: 'ss',
      arrendadorId: 1,
      arrendatarioId,
      fechaPago: null,
      pagado: true,
      id: 0,
    };

    const response = await firstValueFrom( await  this._arrendatariosService.post<Recibo>('recibos', data) );

    const recibo =   await this._arrendatariosService.getByIdAsBlob('recibos/documento', response.id);

    this._inf.showLoader.update(x => x = false);
  }

  async ngOnInit() {
    this._inf.showLoader.update((x) => true);
    (
      await this._arrendatariosService.getAll<Arrendatario>(this.resourceName())
    ).subscribe((data) => {
      this.tableConfigs.tableData = data;
      data.forEach(async (x) => {
        if (x.propiedadId && x.propiedadId > 0) {
          x.propiedad = await firstValueFrom(
            await this._propiedadService.getById<Propiedad>(
              'propiedades',
              x.propiedadId
            )
          );
        }
      });
      this._inf.showLoader.update((x) => false);
    });
  }
}
