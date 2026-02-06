import { Component, inject } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { InfiniteLoaderComponent } from "../../shared/infinite-loader/infinite-loader.component";
import { InfiniteLoaderService } from '../../../shared/services/infinite-loader-service';
import { NgbToast } from "@ng-bootstrap/ng-bootstrap";
import { AppOpStateService } from '../../shared/services/app-op-state';
import { CustomToatsComponent } from '../../shared/custom-toats/custom-toats.component';

@Component({
  selector: "app-common-three-parts",
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    InfiniteLoaderComponent,
    NgbToast,
    CustomToatsComponent
],
  templateUrl: "./common-three-parts.component.html",
  styleUrl: "./common-three-parts.component.scss",
})

export class CommonThreePartsComponent {
  loaderService = inject(InfiniteLoaderService);
  stateService = inject(AppOpStateService);
}
