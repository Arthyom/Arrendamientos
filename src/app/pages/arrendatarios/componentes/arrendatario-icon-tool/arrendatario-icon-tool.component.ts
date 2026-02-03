import { Component, computed, input, OnInit } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";
import { EnumTypeProperty } from '../../../../models/Enums/EnumTypeProperty';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-arrendatario-icon-tool',
  templateUrl: './arrendatario-icon-tool.component.html',
  styleUrls: ['./arrendatario-icon-tool.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    NgbTooltip
  ]
})
export class ArrendatarioIconToolComponent  implements OnInit {

  title = input.required()
  typeProperty = input<EnumTypeProperty>()
  typeProperties = EnumTypeProperty;



  constructor() { }

  ngOnInit() {}


  getTypeProerties(ty: EnumTypeProperty ): string {
    return EnumTypeProperty[ty].toString();
  }



}
