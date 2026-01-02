import { Component } from '@angular/core';
import {CustomTableComponent} from '../../custom-table/custom-table.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CustomTableComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

}
