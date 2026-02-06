import { Component, inject, input, OnInit } from '@angular/core';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { AppOpStateService } from '../services/app-op-state';

@Component({
  selector: 'app-custom-toats',
  templateUrl: './custom-toats.component.html',
  styleUrls: ['./custom-toats.component.scss'],
  standalone: true,
  imports: [
    NgbToast
  ]
})
export class CustomToatsComponent  implements OnInit {

  stateService = inject(AppOpStateService);

  header = input<string>('');
  message = input<string>('');
  class = input<string>('');
  delay = input<number>(5000);
  autoHide = input<boolean>(true);
  constructor() { }

  ngOnInit() {}

}
