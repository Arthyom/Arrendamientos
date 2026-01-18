import { Component, input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonIcon } from "@ionic/angular/standalone";
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-button-actions',
  templateUrl: './button-actions.component.html',
  standalone: true,
  imports:[IonIcon, RouterModule,NgbTooltip],
  styleUrls: ['./button-actions.component.scss'],
})
export class ButtonActionsComponent  implements OnInit {

  itemId = input.required<number>();

  constructor() { }

  ngOnInit() {}

}
