import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { NgbNavContent, NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLinkButton, NgbNavLinkBase, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-index',
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
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

}
