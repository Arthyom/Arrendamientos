import { DecimalPipe } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CustomTableComponent } from '../../../../shared/custom-table/custom-table.component';
import { IArrCustomTableConfigsInterface } from '../../../../shared/custom-table/interfaces/IArrCustomTableConfigs.interface';
import { IonIcon } from '@ionic/angular/standalone';
import { Arrendador } from '../../../../models/Entities/arrendador';
import { ServiceArrDataRequester } from '../../../../shared/services/service-arr-data-requester';
import { ButtonActionsComponent } from '../../../../shared/button-actions/button-actions.component';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754,
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199,
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463,
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397,
  },
];

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [IonIcon, DecimalPipe, CustomTableComponent, ButtonActionsComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent implements OnInit {
  doSomething() {
    alert('so something')
  }

  public httpClient = inject(ServiceArrDataRequester);
  resourceName = input.required<string>();

  tableConfigs: IArrCustomTableConfigsInterface<Arrendador> = {
    tableHeaders: ['Nombre', 'Apellidos', 'Acciones'],
    tableTitle: 'Arrendadores',
    tableData: [],
  };

  async ngOnInit() {
    (await this.httpClient.getAll<Arrendador>(this.resourceName())).subscribe(
      (data) => {
        this.tableConfigs.tableData = data;
        console.log(data);
      }
    );
  }
}
