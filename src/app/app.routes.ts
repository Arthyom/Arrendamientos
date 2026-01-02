import { Routes } from "@angular/router";
import { CommonThreePartsComponent } from "./templates/common-three-parts/common-three-parts.component";
import { pagesRoutes } from "./pages/pages.routes";
export const routes: Routes = [
  /*{
    path: "**",
    redirectTo: "admin",
    pathMatch: "full",
  },
  */
  {
    path: "admin",
    component: CommonThreePartsComponent,
    children: pagesRoutes,
  },
];
