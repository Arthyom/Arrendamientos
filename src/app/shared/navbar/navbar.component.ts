import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterModule, Routes } from "@angular/router";
import { NgbAccordionBody, NgbAccordionButton, NgbAccordionCollapse, NgbAccordionDirective, NgbAccordionHeader, NgbAccordionItem, NgbAccordionToggle, NgbNavLink, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { pagesRoutes } from "../../pages/pages.routes";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    NgbNavModule,
    RouterModule,
    NgbNavLink,
    NgbAccordionButton,
		NgbAccordionDirective,
		NgbAccordionItem,
		NgbAccordionHeader,
		NgbAccordionToggle,
		NgbAccordionBody,
		NgbAccordionCollapse,
  ],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent implements OnInit{
  parentRoutes = signal<Routes>(pagesRoutes);

  activeRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    console.log('xxxx', this.activeRoute.parent?.snapshot)
  }


}
