import { Component, input } from "@angular/core";
import { IArrCustomTableConfigsInterface } from "./interfaces/IArrCustomTableConfigs.interface";
import { NgbAccordionBody, NgbAccordionButton, NgbAccordionCollapse, NgbAccordionDirective, NgbAccordionHeader, NgbAccordionItem, NgbAccordionToggle, NgbHighlight, NgbPagination, NgbScrollSpy, NgbScrollSpyFragment } from "@ng-bootstrap/ng-bootstrap";
import { CardCollapsableComponent } from "../card-collapsable/card-collapsable.component";
import { FormsModule } from "@angular/forms";
import { AsyncPipe, DecimalPipe } from "@angular/common";

@Component({
  selector: "app-custom-table",
  standalone: true,
	imports: [NgbScrollSpy,
    NgbAccordionDirective,
    DecimalPipe, FormsModule, AsyncPipe, NgbHighlight,  NgbPagination
  ],
  templateUrl: "./custom-table.component.html",
  styleUrl: "./custom-table.component.scss",
})
export class CustomTableComponent {
  configs = input.required<IArrCustomTableConfigsInterface<any>>();
total$: any;
service: any;
}
