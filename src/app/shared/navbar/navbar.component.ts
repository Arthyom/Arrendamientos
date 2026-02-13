import { Component, inject, OnInit, signal, TemplateRef } from "@angular/core";
import { ActivatedRoute, RouterModule, Routes } from "@angular/router";
import {  NgbAccordionBody, NgbAccordionButton, NgbAccordionCollapse, NgbAccordionDirective,
   NgbAccordionHeader, NgbAccordionItem, NgbAccordionToggle,  NgbCollapse,  NgbNavLink, NgbNavModule,
   NgbOffcanvas,
   NgbOffcanvasConfig} from "@ng-bootstrap/ng-bootstrap";
import { pagesRoutes } from "../../pages/pages.routes";
import { GlobalTitleService } from "../services/global-title-service";


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
    NgbCollapse,


  ],

  providers:[
    NgbOffcanvasConfig,
    NgbOffcanvas
  ],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent implements OnInit{

  config = inject(NgbOffcanvasConfig);
  private offCanvasService = inject(NgbOffcanvas);

  parentRoutes = signal<Routes>(pagesRoutes);

  titleService = inject(GlobalTitleService);

  activeRoute = inject(ActivatedRoute);

  /**
   *
   */
  constructor() {
    this.config.position = 'end';
		this.config.backdropClass = 'bg-dark';
		this.config.keyboard = false;
    this.config.panelClass = 'w-75 bg-dark'
  }

  ngOnInit(): void {
    console.log('xxxx', this.activeRoute.snapshot.url)
  }




  open(content: TemplateRef<any>){
    this.offCanvasService.open(content)
  }
}
