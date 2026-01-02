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
import { NgbAccordionBody, NgbAccordionButton, NgbAccordionCollapse, NgbAccordionDirective, NgbAccordionHeader, NgbAccordionItem, NgbAccordionToggle } from '@ng-bootstrap/ng-bootstrap';


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

],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent implements OnInit {
  private _arrendatariosService = inject(ServiceArrDataRequester);
  private _propiedadService = inject(ServiceArrDataRequester);
  public showLoader = signal(false);

  resourceName = input.required<string>();

  tableConfigs: IArrCustomTableConfigsInterface<Arrendatario> = {
    tableHeaders: ['Alias', 'Propiedad', 'Acciones'],
    tableTitle: 'Arrendatarios',
    tableData: [],
  };

  async createReport(arrendatarioId: number, propiedadId: number) {
    this.showLoader.update(x => x = true)
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

    this.showLoader.update(x => x = false);
  }

  async ngOnInit() {
    this.showLoader.update((x) => (x = true));
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
      this.showLoader.update((x) => (x = false));
    });
  }
}
