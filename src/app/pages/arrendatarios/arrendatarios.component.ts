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

  /**
   *
   */
  constructor( private _activeRoute : ActivatedRoute) {
    this._titleService.activatedRoute = _activeRoute

  }

  ngOnInit(): void {
    this._titleService.setTitle(this._activeRoute.snapshot.title );
  }



}
