import { Component, input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-button-actions',
  templateUrl: './button-actions.component.html',
  standalone: true,
  imports:[IonIcon, RouterModule],
  styleUrls: ['./button-actions.component.scss'],
})
export class ButtonActionsComponent  implements OnInit {

  itemId = input.required<number>();

  constructor() { }

  ngOnInit() {}

}
