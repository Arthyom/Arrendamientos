import { Component, OnInit, output, signal } from '@angular/core';
import { IMonth } from '../../interfaces/IMonth';
import { FormsModule } from '@angular/forms';
import { IMonthResponse } from '../../interfaces/IMonthResponse';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-multi-recipient',
  templateUrl: './multi-recipient.component.html',
  styleUrls: ['./multi-recipient.component.scss'],
  standalone: true,
  imports: [FormsModule, IonIcon]
})
export class MultiRecipientComponent  implements OnInit {


  monthsSelected = output<IMonthResponse>()
  controlClose = output<boolean>()

  yearStart = signal<number>( new Date().getFullYear())

  constructor() { }

  ngOnInit() {}


  monthNames : IMonth[] = [
    {name: 'Enero', id:1},
    {name: 'Febrero', id:2},
    {name: 'Marzo', id:3},
    {name: 'Abril', id:4},
    {name: 'Mayo', id:5},
    {name: 'Junio', id:6},
    {name: 'Julio', id:7},
    {name: 'Agosto', id:8},
    {name: 'Septiembre', id:9},
    {name: 'Octubre', id:10},
    {name: 'Noviembre', id:11},
    {name: 'Diciembre', id:12},
  ]


  ok(){
    const selectedMonths = this.monthNames.filter(x => x.selected)
    this.monthsSelected.emit({
      year: this.yearStart(),
      months: this.monthNames.filter(x => x.selected)
    })
  }

}
