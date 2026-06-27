import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {
  NgbNavContent,
  NgbNav,
  NgbNavItem,
  NgbNavItemRole,
  NgbNavLinkButton,
  NgbNavLinkBase,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';
import { IonIcon } from "@ionic/angular/standalone";
import { GlobalTitleService } from '../../shared/services/global-title-service';
import { EnumTypeProperty } from '../../models/Enums/EnumTypeProperty';
import { MapperFormValues } from '../../models/Mappers/MapperFormValues';
import { ServicioArrendatariosFiltros } from './services/servicio-arrendatarios-filtros';

@Component({
  selector: 'app-arrendatarios',
  standalone: true,
  imports: [
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
  templateUrl: './arrendatarios.component.html',
  styleUrl: './arrendatarios.component.scss',
})
export class ArrendatariosComponent implements OnInit{

  private _titleService = inject(GlobalTitleService);
  public  filterService = inject(ServicioArrendatariosFiltros);
  propertyTypes = MapperFormValues.convertTo( EnumTypeProperty )

  /**
   *
  */
 constructor( private _activeRoute : ActivatedRoute) {
   this._titleService.activatedRoute = _activeRoute

  }

  emitPropertiesFilter(propertyType : string) {

    const propertyTypeMapped = (+propertyType) as EnumTypeProperty;
    switch (propertyType) {
      case '0':
        this.filterService.filterByValidPropertyTypes();
        break;

      default:
        this.filterService.filterByPropertyType(propertyTypeMapped);
        break;
    }
  }

  emitStateFilter(stateType: string) {
    switch (stateType) {
      case "1":
          this.filterService.filterByValidPropertyTypes()

        break;

      case "2":
        this.filterService.filterByInActives()
        break;

      case "3":
          this.filterService.filterByActives()
        break;

      default:
          this.filterService.filterByActives()
        break;
    }
  }

  ngOnInit(): void {
    this._titleService.setTitle(this._activeRoute.snapshot.title );
  }



}
