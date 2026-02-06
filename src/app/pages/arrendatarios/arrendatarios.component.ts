import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
export class ArrendatariosComponent {}
