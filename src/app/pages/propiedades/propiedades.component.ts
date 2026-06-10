import { Component, Inject, inject, OnInit } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import { GlobalTitleService } from '../../shared/services/global-title-service';
import { NgbNav, NgbNavContent, NgbNavItem, NgbNavItemRole, NgbNavLinkBase, NgbNavLinkButton, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-propiedades',
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
  templateUrl: './propiedades.component.html',
  styleUrl: './propiedades.component.scss'
})

export class PropiedadesComponent {

    private _titleService = inject(GlobalTitleService);

    constructor( private _activeRoute: ActivatedRoute) {

      this._titleService.activatedRoute = this._activeRoute
    }



}
