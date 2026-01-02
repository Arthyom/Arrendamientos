import { Component, OnInit } from '@angular/core';
import { NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionBody, NgbAccordionCollapse, NgbAccordionButton } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-card-collapsable',
  templateUrl: './card-collapsable.component.html',
  styleUrls: ['./card-collapsable.component.scss'],
  imports:[
 CardCollapsableComponent,
        NgbAccordionButton,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionToggle,
    NgbAccordionBody,
    NgbAccordionCollapse,
  ]
})
export class CardCollapsableComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
