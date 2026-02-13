import { Component, Inject, inject, OnInit } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import { GlobalTitleService } from '../../shared/services/global-title-service';

@Component({
  selector: 'app-propiedades',
  standalone: true,
  imports: [
    RouterOutlet
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
