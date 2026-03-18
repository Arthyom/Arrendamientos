import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import { GlobalTitleService } from '../../shared/services/global-title-service';

@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [
    RouterOutlet
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
