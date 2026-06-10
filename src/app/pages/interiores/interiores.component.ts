import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { GlobalTitleService } from '../../shared/services/global-title-service';
import { BasePage } from '../../models/base/BasePage';
import { NgbNavContent, NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLinkButton, NgbNavLinkBase, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  standalone: true,
  imports: [RouterOutlet,
    NgbNavContent,
    NgbNav,
    NgbNavItem,
    NgbNavItemRole,
    NgbNavLinkButton,
    NgbNavLinkBase,
    NgbNavOutlet, IonIcon],
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
