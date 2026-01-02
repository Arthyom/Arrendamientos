import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { CommonThreePartsComponent } from "./templates/common-three-parts/common-three-parts.component";
import { addIcons } from "ionicons";
import { IonIcon } from "@ionic/angular/standalone";
import * as icons from "ionicons/icons";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [IonIcon, RouterOutlet, CommonThreePartsComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  title = "Arrendamientos";

  ngOnInit(): void {}

  constructor() {
    addIcons(icons);
  }
}
