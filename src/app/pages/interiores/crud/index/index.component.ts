import { AfterViewInit, Component, OnInit, inject, signal } from '@angular/core';
import { CustomTableComponent } from "../../../../shared/custom-table/custom-table.component";
import { Interior } from '../../../../models/Entities/interior';
import { BaseIndexPage } from '../../../../models/base/BaseIndexPage';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ServiceArrDataRequester } from '../../../../shared/services/service-arr-data-requester';
import { InfiniteLoaderService } from '../../../../../shared/services/infinite-loader-service';
import { CardCollapsableComponent } from "../../../../shared/card-collapsable/card-collapsable.component";
import { ButtonActionsComponent } from "../../../../shared/button-actions/button-actions.component";
import { IonIcon } from "@ionic/angular/standalone";
import { ModalContainerComponent } from "../../../../shared/modal-container/modal-container.component";
import { AppArrendatarioSelectComponent } from '../../components/app-arrendatario-select/app-arrendatario-select.component';
import { NgbNavContent, NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLinkButton, NgbNavLinkBase, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  imports: [AppArrendatarioSelectComponent, CustomTableComponent, CardCollapsableComponent, ButtonActionsComponent, IonIcon, ModalContainerComponent,

               RouterOutlet,
                  RouterOutlet,
                    NgbNavContent,
                    NgbNav,
                    NgbNavItem,
                    NgbNavItemRole,
                    NgbNavLinkButton,
                    NgbNavLinkBase,
                    NgbNavOutlet,
                    IonIcon

  ],
})
export class IndexComponent  extends BaseIndexPage<Interior>   {

  showSelector = signal(false);
  selectedInterior = signal<Interior | undefined>(undefined);

  constructor(){
    super(
      inject(InfiniteLoaderService),
      inject(ServiceArrDataRequester),
      inject(ActivatedRoute)
    );
  }


  selected($event: Event) {
  throw new Error('Method not implemented.');
  }

  hideModal() {
    this._inf.showLoader.update(x => x = false);
  }

  showModal() {
    this._inf.showLoader.update(x => x = true);
  }



}
