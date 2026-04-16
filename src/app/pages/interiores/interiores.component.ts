import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { GlobalTitleService } from '../../shared/services/global-title-service';
import { BasePage } from '../../models/base/BasePage';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-interiores',
  templateUrl: './interiores.component.html',
  styleUrls: ['./interiores.component.scss'],
})
export class InterioresComponent  extends BasePage {

 constructor() {
  super(
    inject(GlobalTitleService),
    inject(ActivatedRoute)
  );

 }

}
