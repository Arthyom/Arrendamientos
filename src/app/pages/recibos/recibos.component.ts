import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import { GlobalTitleService } from '../../shared/services/global-title-service';

@Component({
  selector: 'app-recibos',
  standalone: true,
  imports: [
    RouterOutlet
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
