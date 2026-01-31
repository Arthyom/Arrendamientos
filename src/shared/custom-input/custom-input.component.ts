import { Component, input, OnInit } from '@angular/core';
import { ICommonCustomForm } from '../../app/models/Interfaces/ICommonFormCustom';
import { ICommonFormControll } from '../../app/models/Interfaces/ICommonFormControll';
import { EnumCommonFormControllType } from '../../app/models/Interfaces/ECommonFormControllType';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    JsonPipe
  ]
})
export class CustomInputComponent  implements OnInit {

  customFormControl = input.required<ICommonFormControll>();
  customControlTypes = EnumCommonFormControllType;
  constructor() { }

  ngOnInit() {
    console.log('teeees',
    this.customFormControl().control);
  }

}
