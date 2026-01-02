import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-recibos',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './recibos.component.html',
  styleUrl: './recibos.component.scss'
})
export class RecibosComponent {

}
