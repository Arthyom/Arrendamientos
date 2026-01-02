import { Routes } from "@angular/router";
import { ArrendadoresComponent } from "./arrendadores/arrendadores.component";
import { ArrendatariosComponent } from "./arrendatarios/arrendatarios.component";
import { FiadoresComponent } from "./fiadores/fiadores.component";
import { PropiedadesComponent } from "./propiedades/propiedades.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ContratosComponent } from "./contratos/contratos.component";
import { RecibosComponent } from "./recibos/recibos.component";
import { PropiedadesActionRoutes } from "./propiedades/propiedadesAction.routes";
import { ArrendadoresActionRoutes } from "./arrendadores/arrendadoresAction.routes";
import { ArrendatariosActionRoutes } from "./arrendatarios/ArrendatariosAction.routes";
import { FiadoresActionRoutes } from "./fiadores/fiadoresAction.routes";
import { ContratosActionRoutes } from "./contratos/contratosAction.routes";
import { RecibosActionRoutes } from "./recibos/recibossAction.routes";

export const pagesRoutes: Routes = [
  {
    title: "Inicio",
    path: "home",
    component: WelcomeComponent,
  },
  {
    title: "Arrendadores",
    path: "arrendadores",
    component: ArrendadoresComponent,
    children: ArrendadoresActionRoutes,
  },
  {
    title: "Arrendatarios",
    path: "arrendatarios",
    component: ArrendatariosComponent,
    children: ArrendatariosActionRoutes,
  },
  {
    title: "Fiadores",
    path: "fiadores",
    component: FiadoresComponent,
    children: FiadoresActionRoutes,
  },
  {
    title: "Propiedades",
    path: "propiedades",
    component: PropiedadesComponent,
    children: PropiedadesActionRoutes,
  },
  {
    title: "Contratos",
    path: "contratos",
    component: ContratosComponent,
    children: ContratosActionRoutes,
  },
  {
    title: "Recibos",
    path: "recibos",
    component: RecibosComponent,
    children: RecibosActionRoutes,
  },
];
