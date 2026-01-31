import { Component, inject } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { InfiniteLoaderComponent } from "../../shared/infinite-loader/infinite-loader.component";
import { InfiniteLoaderService } from '../../../shared/services/infinite-loader-service';

@Component({
  selector: "app-common-three-parts",
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    InfiniteLoaderComponent],
  templateUrl: "./common-three-parts.component.html",
  styleUrl: "./common-three-parts.component.scss",
})
export class CommonThreePartsComponent {
  loaderService = inject(InfiniteLoaderService);
}
