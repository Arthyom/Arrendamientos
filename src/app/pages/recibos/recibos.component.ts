import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import { GlobalTitleService } from '../../shared/services/global-title-service';
import { NgbNavContent, NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLinkButton, NgbNavLinkBase, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-recibos',
  standalone: true,
  imports: [
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
  templateUrl: './recibos.component.html',
  styleUrl: './recibos.component.scss'
})
export class RecibosComponent implements OnInit {

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
