import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
  selector: "app-common-three-parts",
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: "./common-three-parts.component.html",
  styleUrl: "./common-three-parts.component.scss",
})
export class CommonThreePartsComponent {}
