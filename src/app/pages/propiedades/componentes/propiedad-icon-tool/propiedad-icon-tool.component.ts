import { Component, input, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { EnumTypeProperty } from '../../../../models/Enums/EnumTypeProperty';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-propiedad-icon-tool',
  templateUrl: './propiedad-icon-tool.component.html',
  styleUrls: ['./propiedad-icon-tool.component.scss'],
  imports: [IonIcon, NgbTooltip],
})
export class PropiedadIconToolComponent implements OnInit {
  title = input.required();
  typeProperty = input<EnumTypeProperty>();
  typeProperties = EnumTypeProperty;

  constructor() {}

  ngOnInit() {}

  getTypeProerties(ty: EnumTypeProperty): string {
    return EnumTypeProperty[ty].toString();
  }
}
