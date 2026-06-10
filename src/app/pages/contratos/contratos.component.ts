import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import { GlobalTitleService } from '../../shared/services/global-title-service';
import { IonIcon } from '@ionic/angular/standalone';
import { NgbNavContent, NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLinkButton, NgbNavLinkBase, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contratos',
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
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.scss'
})
export class ContratosComponent implements OnInit {

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
